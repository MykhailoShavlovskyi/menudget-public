import {
  BufferAttribute,
  BufferGeometry,
  MathUtils,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Plane,
  Ray,
  Vector3,
} from "three"
import { sortBy } from "lodash"
//import { Geometry } from "three/examples/jsm/deprecated/Geometry"

/**
 * Util that allows calculating camera position and look-at for perfectly fitting points and objects in the frustum
 * It is a Typescript integration of example:
 * https://rawgit.com/moroine/three.js/CameraViewBox/examples/misc_camera_center.html
 */
export class CameraViewBox {
  // Properties
  private fitRatio = 1
  private verticalTanFov = 0
  private horizontalTanFov = 0

  // Vies basis
  private viewBasis = {
    x: new Vector3(),
    y: new Vector3(),
    z: new Vector3(),
  }

  // View projection
  private viewProjection = {
    top: new Vector3(),
    left: new Vector3(),
    bottom: new Vector3(),
    right: new Vector3(),
  }

  // Bounds
  private bounds = {
    isEmpty: true,

    // Arbitrary point, basically the first point
    anchor: new Vector3(),

    // Plane parallel to Camera plane passing by the anchor
    plane: new Plane(),

    // Max distance from the anchor to any point intersecting the plane through viewProjection.top direction
    top: -Infinity,

    // Min distance from the anchor to any point intersecting the plane through viewProjection.left direction
    left: +Infinity,

    // Max distance from the anchor to any point intersecting the plane through viewProjection.bottom direction
    bottom: +Infinity,

    // Max distance from the anchor to any point intersecting the plane through viewProjection.right direction
    right: -Infinity,
  }

  /**
   * Set camera frustum fit ratio
   * @param fitRatio - fit ratio
   */
  public SetFitRatio(fitRatio: number): void {
    this.fitRatio = fitRatio
  }

  //region Set view

  /**
   * Set view from given camera (from camera basis, fov & aspect)
   * @param camera
   */
  public SetViewFromCamera(camera: PerspectiveCamera): void {
    const x = new Vector3()
    const y = new Vector3()
    const z = new Vector3()
    camera.updateMatrixWorld(true)
    camera.matrixWorld.extractBasis(x, y, z)

    this.SetViewFromBasis(x, y, z, camera.fov, camera.aspect)
  }

  /**
   * Set view from basis
   * @param x - X basis axis
   * @param y - Y basis axis
   * @param z - Z basis axis
   * @param fov - camera FOV
   * @param aspect - camera aspect
   */
  public SetViewFromBasis(x: Vector3, y: Vector3, z: Vector3, fov: number, aspect: number): void {
    const v = new Vector3()

    const vFov = MathUtils.degToRad(fov)
    this.verticalTanFov = 2 * Math.tan(vFov / 2)

    const hFov = 2 * Math.atan((this.verticalTanFov / 2) * aspect)
    this.horizontalTanFov = 2 * Math.tan(hFov / 2)

    this.viewBasis.x.copy(x)
    this.viewBasis.y.copy(y)
    this.viewBasis.z.copy(z)

    this.viewProjection.top.set(0, 0, 0)
    this.viewProjection.bottom.set(0, 0, 0)
    this.viewProjection.left.set(0, 0, 0)
    this.viewProjection.right.set(0, 0, 0)

    v.copy(z).multiplyScalar(-Math.cos(vFov / 2))
    this.viewProjection.top.add(v)
    this.viewProjection.bottom.add(v)
    v.copy(y).multiplyScalar(Math.sin(vFov / 2))
    this.viewProjection.top.add(v)
    this.viewProjection.bottom.add(v.negate())

    v.copy(z).multiplyScalar(-Math.cos(hFov / 2))
    this.viewProjection.left.add(v)
    this.viewProjection.right.add(v)
    v.copy(x).multiplyScalar(Math.sin(hFov / 2))
    this.viewProjection.right.add(v)
    this.viewProjection.left.add(v.negate())
  }

  //endregion Set view

  //region Expand view

  /**
   * Clear view and expand by given object
   * @param object - target object
   */
  public SetFromObject(object: Object3D): void {
    this.MakeEmpty()
    this.ExpandByObject(object)
  }

  /**
   * Clear view and expand by given objects
   * @param objects - target objects
   */
  public SetFromObjects(objects: Object3D[]): void {
    this.MakeEmpty()
    return this.ExpandByObjects(objects)
  }

  /**
   * Expand view by given object
   * @param object - target object
   */
  public ExpandByObject(object: Object3D): void {
    const v1 = new Vector3()

    const traverse = (node: Object3D) => {
      const geometry = (node as Mesh).geometry

      if (geometry !== undefined) {
        {
          const attribute = (geometry as BufferGeometry).attributes.position
          if (attribute !== undefined) {
            for (let i = 0, l = attribute.count; i < l; i++) {
              v1.fromBufferAttribute(attribute as BufferAttribute, i).applyMatrix4(node.matrixWorld)
              this.ExpandByPoint(v1)
            }
          }
        }
      }
    }

    function getMeshes(object: Object3D): Mesh[] {
      const meshes: Mesh[] = []
      object.traverse((o) => (o as Mesh).isMesh && meshes.push(o as Mesh))
      return meshes
    }

    object.updateMatrixWorld(true)
    let meshes = getMeshes(object)
    meshes = sortBy(meshes, (v) => v.name)
    meshes.reverse()
    meshes.forEach(traverse)
  }

  /**
   * Expand view by given objects
   * @param objects - target objects
   */
  public ExpandByObjects(objects: Object3D[]): void {
    const sorted = sortBy(objects, (v) => v.name)
    for (const object of sorted) this.ExpandByObject(object)
  }

  /**
   * Expand view by given point
   * @param point - target point
   */
  public ExpandByPoint(point: Vector3): void {
    const ray = new Ray()
    const projectedPoint = new Vector3()
    let distance

    if (this.bounds.isEmpty) {
      // If empty, then set the anchor and the plane
      this.bounds.anchor.copy(point)
      this.bounds.plane.setFromNormalAndCoplanarPoint(this.viewBasis.z, this.bounds.anchor)
      this.bounds.isEmpty = false
    }

    ray.origin.copy(point)

    // TOP
    ray.direction.copy(this.viewProjection.top)
    if (ray.intersectPlane(this.bounds.plane, projectedPoint) === null) {
      ray.direction.negate()
      ray.intersectPlane(this.bounds.plane, projectedPoint)
    }
    distance = projectedPoint.sub(this.bounds.anchor).dot(this.viewBasis.y)
    this.bounds.top = Math.max(this.bounds.top, distance)

    // BOTTOM
    ray.direction.copy(this.viewProjection.bottom)
    if (ray.intersectPlane(this.bounds.plane, projectedPoint) === null) {
      ray.direction.negate()
      ray.intersectPlane(this.bounds.plane, projectedPoint)
    }
    distance = projectedPoint.sub(this.bounds.anchor).dot(this.viewBasis.y)
    this.bounds.bottom = Math.min(this.bounds.bottom, distance)

    // LEFT
    ray.direction.copy(this.viewProjection.left)
    if (ray.intersectPlane(this.bounds.plane, projectedPoint) === null) {
      ray.direction.negate()
      ray.intersectPlane(this.bounds.plane, projectedPoint)
    }
    distance = projectedPoint.sub(this.bounds.anchor).dot(this.viewBasis.x)
    this.bounds.left = Math.min(this.bounds.left, distance)

    // RIGHT
    ray.direction.copy(this.viewProjection.right)
    if (ray.intersectPlane(this.bounds.plane, projectedPoint) === null) {
      ray.direction.negate()
      ray.intersectPlane(this.bounds.plane, projectedPoint)
    }
    distance = projectedPoint.sub(this.bounds.anchor).dot(this.viewBasis.x)
    this.bounds.right = Math.max(this.bounds.right, distance)
  }

  /**
   * Clear view
   */
  public MakeEmpty(): void {
    this.bounds.isEmpty = true
    this.bounds.top = -Infinity
    this.bounds.left = +Infinity
    this.bounds.bottom = +Infinity
    this.bounds.right = -Infinity
  }

  /**
   * Return true if view is empty
   * @returns true if view is empty
   */
  public IsEmpty(): boolean {
    return this.bounds.isEmpty
  }

  //endregion Expand view

  //region Get position & target

  /**
   * Write view-box camera target in to given vector
   * @param target - vector to write target in
   * @param plane - plane to try to put target on
   */
  public GetTarget(target: Vector3, plane: Plane): void {
    const position = new Vector3()
    return this.GetCameraPositionAndTarget(position, target, plane)
  }

  /**
   * Write view-box camera position in to given vector
   * @param position - vector to write position in
   */
  public GetCameraPosition(position: Vector3): void {
    const target = new Vector3()
    return this.GetCameraPositionAndTarget(position, target)
  }

  /**
   * Write view-box camera position and target in to given vectors
   * @param position - vector to write position in
   * @param target - vector to write target in
   * @param plane - plane to try to put target on
   */
  public GetCameraPositionAndTarget(position: Vector3, target: Vector3, plane?: Plane): void {
    const v = new Vector3()
    const center = new Vector3()
    const ray = new Ray()

    center.copy(this.bounds.anchor)

    v.copy(this.viewBasis.y).multiplyScalar((this.bounds.top + this.bounds.bottom) / 2)
    center.add(v)

    v.copy(this.viewBasis.x).multiplyScalar((this.bounds.left + this.bounds.right) / 2)
    center.add(v)

    const distance = Math.max(
      (this.bounds.top - this.bounds.bottom) / this.verticalTanFov,
      (this.bounds.right - this.bounds.left) / this.horizontalTanFov
    )

    v.copy(this.viewBasis.z).multiplyScalar(distance * this.fitRatio)

    position.copy(center).add(v)
    target.copy(center)

    if (plane !== undefined) {
      ray.origin.copy(position)
      ray.direction.copy(this.viewBasis.z).negate()
      if (ray.intersectPlane(plane, target) === null) {
        ray.direction.negate()
        if (null === ray.intersectPlane(plane, target))
          console.warn("THREE.CameraViewBox: unable to put target on given floor plane")
      }
    }
  }

  //endregion Get position & target
}
