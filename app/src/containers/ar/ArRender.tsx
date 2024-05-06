import '@babylonjs/loaders/glTF';
import {
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  Engine,
  HemisphericLight,
  MeshBuilder,
  PolygonMeshBuilder,
  Quaternion,
  Scene,
  StandardMaterial,
  Vector2,
  Vector3,
  WebXRPlaneDetector,
  WebXRSessionManager,
  SceneLoader,
  Nullable,
} from '@babylonjs/core';
import {IWebXRPlane} from '@babylonjs/core/XR/features/WebXRPlaneDetector';
import {IDisposable} from '@babylonjs/core/scene';
import {Mesh} from '@babylonjs/core/Meshes/mesh';
import earcut from 'earcut';
import {EngineView, useEngine} from '@babylonjs/react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Camera} from '@babylonjs/core/Cameras/camera';
import {useUnmount} from 'react-use';
import {useRoute} from '@react-navigation/native';
import {ArRoute} from '../../navigators/RootStackNavigator';
import {useDishModelUrl, useDishPrice} from '../../store/selectors';

function createScene(engine: Engine) {
  // Scene
  const scene = new Scene(engine);

  // Camera
  const camera = new ArcRotateCamera(
    'camera',
    3.73,
    1.28,
    3.5,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl();

  // Lights
  const dirLight = new DirectionalLight(
    'dirLight',
    new Vector3(0.47, 0.0, -0.86),
    scene,
  );
  dirLight.diffuse = Color3.FromInts(255, 251, 199);
  dirLight.intensity = 3;
  new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene);

  return {scene, camera};
}

type XrPlane = IWebXRPlane & IDisposable & {mesh: Mesh};
let planes: Mesh[] = [];
let dishPlaced = false;

function planeIsVertical(plane: XrPlane) {
  const quaternion = new Quaternion();
  plane.transformationMatrix.decompose(undefined, quaternion, undefined);
  const euler = quaternion.toEulerAngles();
  return !(Math.abs(euler.x) > 0.1 || Math.abs(euler.z) > 0.1);
}

function addPlane(plane: XrPlane, scene: Scene) {
  if (dishPlaced || !planeIsVertical(plane)) return;

  // Save polygon definition
  plane.polygonDefinition.push(plane.polygonDefinition[0]);

  // Create plane polygon
  const polygon_triangulation = new PolygonMeshBuilder(
    'plane polygon',
    plane.polygonDefinition.map(p => new Vector2(p.x, p.z)),
    scene,
    earcut,
  );
  const polygon = polygon_triangulation.build(false, 0.01);
  plane.mesh = polygon;
  planes[plane.id] = plane.mesh;

  // Set material
  const mat = new StandardMaterial('mat', scene);
  mat.alpha = 0.5;
  mat.diffuseColor = Color3.Yellow();
  polygon.createNormals(true);
  // polygon.receiveShadows = true;
  plane.mesh.material = mat;

  // Set transform
  plane.mesh.rotationQuaternion = new Quaternion();
  plane.transformationMatrix.decompose(
    plane.mesh.scaling,
    plane.mesh.rotationQuaternion,
    plane.mesh.position,
  );
}

function updatePlane(plane: XrPlane, scene: Scene) {
  if (dishPlaced || !planeIsVertical(plane)) return;

  let mat;

  // Dispose old mesh
  if (plane.mesh) {
    mat = plane.mesh.material;
    plane.mesh.dispose(false, false);
  }

  // Update polygon definitions
  const some = plane.polygonDefinition.some(p => !p);
  if (some) return;
  plane.polygonDefinition.push(plane.polygonDefinition[0]);

  // Create new msh
  const polygon_triangulation = new PolygonMeshBuilder(
    'plane polygon',
    plane.polygonDefinition.map(p => new Vector2(p.x, p.z)),
    scene,
    earcut,
  );
  const polygon = polygon_triangulation.build(false, 0.01);
  polygon.createNormals(true);
  plane.mesh = polygon;
  planes[plane.id] = plane.mesh;

  // Set material
  if (mat) plane.mesh.material = mat;

  // Set transform
  plane.mesh.rotationQuaternion = new Quaternion();
  plane.transformationMatrix.decompose(
    plane.mesh.scaling,
    plane.mesh.rotationQuaternion,
    plane.mesh.position,
  );

  // plane.mesh.receiveShadows = true;
}

function removePlane(plane: XrPlane) {
  if (plane && planes[plane.id]) planes[plane.id].dispose();
}

function removePlanes() {
  planes.forEach(plane => plane.dispose());
  while (planes.pop()) {}
}

async function placeDish(engine: Engine, scene: Scene, modelUrl: string) {
  if (dishPlaced) return;

  const pick = scene.pick(scene.pointerX, scene.pointerY);
  if (pick?.pickedPoint) {
    const point = pick.pickedPoint;

    const fixedUrl = modelUrl.replace('%2F', '/').replace('%2F', '/');
    SceneLoader.Append(
      fixedUrl,
      undefined,
      scene,
      s => {
        const spawned = s.meshes.find(
          v => v.name !== '__root__' && v.name !== 'plane polygon',
        );
        if (spawned == null) return;

        spawned.scaling.multiplyInPlace(new Vector3(0.5, 0.5, 0.5)); // TODO temp

        const boundingBox = spawned.getBoundingInfo().boundingBox;
        const modelCenter = boundingBox.center.multiplyByFloats(
          spawned.scaling.x,
          spawned.scaling.y,
          spawned.scaling.z,
        );
        const desiredCenterPoint = new Vector3(-point.x, point.y, point.z);
        const offset = desiredCenterPoint.subtract(modelCenter);
        spawned.position.addInPlace(offset);

        //const box = MeshBuilder.CreateBox('box', {size: 0.03}, scene);
        //box.position.set(point.x, point.y, point.z);

        removePlanes();
        dishPlaced = true;
      },
      undefined,
      undefined,
      '.glb',
    );
  }
}

export const ArRender = ({onInitialize}: {onInitialize: () => void}) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();
  const [scene, setScene] = useState<Scene>();
  const [xrSession, setXrSession] = useState<WebXRSessionManager>();

  const {dishId} = useRoute<ArRoute>().params;
  const modelUrl = useDishModelUrl(dishId);

  // Init scene on mount
  useEffect(() => {
    if (engine == null) return;
    const {scene, camera} = createScene(engine);
    setScene(scene);
    setCamera(camera);
  }, [engine]);

  // Handle XR toggle
  const handleToggleXr = useCallback(async () => {
    // Init XR session
    if (!xrSession) {
      if (scene == null) return;
      dishPlaced = false;

      // Create session
      const xr = await scene.createDefaultXRExperienceAsync({
        disableDefaultUI: true,
        disableTeleportation: true,
      });
      const session = await xr.baseExperience.enterXRAsync(
        'immersive-ar',
        'local-floor',
        xr.renderTarget,
      );
      setXrSession(session);

      // Handle exit
      session.onXRSessionEnded.add(() => {
        setXrSession(undefined);
        scene.onPointerDown = () => {};
      });

      // Handle pointer down
      scene.onPointerDown = () => {
        if (engine && scene && modelUrl) placeDish(engine, scene, modelUrl);
      };

      // Handle adding/updating/removing XR planes
      const fm = xr.baseExperience.featuresManager;
      const xrPlanes = fm.enableFeature(WebXRPlaneDetector.Name, 'latest');
      (xrPlanes as any).onPlaneAddedObservable.add((plane: XrPlane) =>
        addPlane(plane, scene),
      );
      (xrPlanes as any).onPlaneUpdatedObservable.add((plane: XrPlane) =>
        updatePlane(plane, scene),
      );
      (xrPlanes as any).onPlaneRemovedObservable.add((plane: XrPlane) =>
        removePlane(plane),
      );
      xr.baseExperience.sessionManager.onXRSessionInit.add(() => {
        removePlanes();
      });
    }

    // Kill XR session
    else {
      dishPlaced = false;
      await xrSession.exitXRAsync();
    }
  }, [scene, xrSession]);

  useEffect(() => {
    if (scene != null && camera != null) handleToggleXr();
  }, [scene, camera]);

  /* useUnmount(() => {
    void handleToggleXr();
  });*/

  return (
    <EngineView
      camera={camera}
      displayFrameRate={false}
      onInitialized={onInitialize}
    />
  );
};
