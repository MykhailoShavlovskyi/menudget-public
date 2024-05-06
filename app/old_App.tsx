import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ViewProps,
} from 'react-native';
import {EngineView, useEngine} from '@babylonjs/react-native';
import {Camera} from '@babylonjs/core/Cameras/camera';
import '@babylonjs/loaders/glTF';
import {
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  GlowLayer,
  HemisphericLight,
  MeshBuilder,
  Plane,
  PolygonMeshBuilder,
  Quaternion,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector2,
  Vector3,
  WebXRAnchorSystem,
  WebXRHitTest,
  WebXRPlaneDetector,
  WebXRSessionManager,
  WebXRState,
  WebXRTrackingState,
} from '@babylonjs/core';
import earcut from 'earcut';
import {ArScreen} from './src/screens/ArScreen';

const EngineScreen: FunctionComponent<ViewProps> = (props: ViewProps) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();
  const [scene, setScene] = useState<Scene>();
  const [xrSession, setXrSession] = useState<WebXRSessionManager>();
  const [trackingState, setTrackingState] = useState<WebXRTrackingState>();

  const switchAR = (arMode: boolean): void => {
    if (arMode) {
      const meshes = scene?.getActiveMeshes();
      meshes?.forEach(v => {
        v.scaling.set(0.5, 0.5, 0.5);
      });
    } else {
      const meshes = scene?.getActiveMeshes();
      meshes?.forEach(v => {
        v.scaling.set(1, 1, 1);
      });
    }
  };

  useEffect(() => {
    if (engine == null) return;

    const scene = new Scene(engine);
    setScene(scene);

    const camera = new ArcRotateCamera(
      'camera',
      3.73,
      1.28,
      3.5,
      Vector3.Zero(),
      scene,
    );
    camera.attachControl();
    setCamera(camera!);

    // TODO use scene createDefaultLight ???
    const dirLight = new DirectionalLight(
      'dirLight',
      new Vector3(0.47, 0.0, -0.86),
      scene,
    );
    dirLight.diffuse = Color3.FromInts(255, 251, 199);
    dirLight.intensity = 3;

    const light = new HemisphericLight(
      'HemiLight',
      new Vector3(0, 1, 0),
      scene,
    );

    /*setScene(scene);
    const url =
      'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated.gltf';
    SceneLoader.LoadAsync(url, undefined, engine).then(loadScene => {
      setScene(loadScene);
      loadScene.createDefaultCameraOrLight(true, undefined, true);
      (loadScene.activeCamera as ArcRotateCamera).alpha += Math.PI;
      (loadScene.activeCamera as ArcRotateCamera).radius = 10;
      setCamera(loadScene.activeCamera!);
    });*/

    console.debug('Created scene');
  }, [engine]);

  const trackingStateToString = (
    trackingState: WebXRTrackingState | undefined,
  ): string => {
    return ((trackingState as any) === '').toString(); //undefined ? '' : WebXRTrackingState[trackingState];
  };

  const onToggleXr = useCallback(() => {
    (async () => {
      if (xrSession) {
        await xrSession.exitXRAsync();
      } else {
        if (scene !== undefined) {
          const xr = await scene.createDefaultXRExperienceAsync({
            disableDefaultUI: true,
            disableTeleportation: true,
          });
          const session = await xr.baseExperience.enterXRAsync(
            'immersive-ar',
            /*'unbounded',*/ 'local-floor',
            xr.renderTarget,
          );

          setXrSession(session);
          session.onXRSessionEnded.add(() => {
            setXrSession(undefined);
            setTrackingState(undefined);
            switchAR(false);
          });

          setTrackingState(xr.baseExperience.camera.trackingState);
          xr.baseExperience.camera.onTrackingStateChanged.add(
            newTrackingState => {
              setTrackingState(newTrackingState);
            },
          );
          switchAR(true);

          // ----------------------------
          const fm = xr.baseExperience.featuresManager;
          const xrTest = fm.enableFeature(WebXRHitTest.Name, 'latest');
          const xrPlanes = fm.enableFeature(WebXRPlaneDetector.Name, 'latest');
          const anchors = fm.enableFeature(WebXRAnchorSystem.Name, 'latest');

          if (xrTest) console.log('xrTest attached');
          if (xrPlanes) console.log('xrPlanes attached');
          if (anchors) console.log('anchors attached');

          const marker = MeshBuilder.CreateTorus('marker', {
            diameter: 0.15,
            thickness: 0.05,
          });
          marker.isVisible = false;
          marker.rotationQuaternion = new Quaternion();

          let hitTest: any;
          /*(xrTest as any).onHitTestResultObservable.add((results: any) => {
            console.debug('onHitTestResultObservable');
            if (results.length) {
              marker.isVisible = true;
              hitTest = results[0];
              /!*hitTest.transformationMatrix.decompose(
                undefined,
                b.rotationQuaternion,
                b.position,
              );*!/
              hitTest.transformationMatrix.decompose(
                undefined,
                marker.rotationQuaternion,
                marker.position,
              );
            } else {
              marker.isVisible = false;
              hitTest = undefined;
            }
          });
*/
          /*if (anchors) {
            (anchors as any).onAnchorAddedObservable.add((anchor: any) => {
              console.debug('onAnchorAddedObservable');
              /!*console.log('attaching', anchor);
              b.isVisible = true;
              anchor.attachedNode = b.clone('mensch');
              anchor.attachedNode.skeleton = skeleton.clone('skelet');
              shadowGenerator.addShadowCaster(anchor.attachedNode, true);
              scene.beginAnimation(
                anchor.attachedNode.skeleton,
                idleRange.from,
                idleRange.to,
                true,
              );
              b.isVisible = false;*!/
            });

            (anchors as any).onAnchorRemovedObservable.add((anchor: any) => {
              console.debug('onAnchorRemovedObservable');
              /!* console.log('disposing', anchor);
              if (anchor) {
                anchor.attachedNode.isVisible = false;
                anchor.attachedNode.dispose();
              }*!/
            });
          }*/

          scene.onPointerDown = (evt, pickInfo) => {
            console.log('Pointer down');
            if (scene) {
              const pick = scene.pick(scene.pointerX, scene.pointerY);
              console.debug(pick?.pickedMesh?.name);

              if (pick?.pickedPoint) {
                const box = MeshBuilder.CreateBox('box', undefined, scene); //scene is optional and defaults to the current scene
                box.position.set(
                  pick.pickedPoint.x,
                  pick.pickedPoint.y,
                  pick.pickedPoint.z,
                );
                box.scaling.set(0.2, 0.2, 0.2);
              }
            }

            /* if (
              hitTest &&
              anchors &&
              xr.baseExperience.state === WebXRState.IN_XR
            ) {
              console.log('add anchor using hit test');
              (anchors as any).addAnchorPointUsingHitTestResultAsync(hitTest);
            }*/
          };

          const planes: any[] = [];

          (xrPlanes as any).onPlaneAddedObservable.add((plane: any) => {
            console.debug('onPlaneAddedObservable');

            const q = new Quaternion();
            plane.transformationMatrix.decompose(
              new Vector3(),
              q,
              new Vector3(),
            );
            const euler = q.toEulerAngles();
            if (Math.abs(euler.x) > 0.1 || Math.abs(euler.z) > 0.1) return;

            plane.polygonDefinition.push(plane.polygonDefinition[0]);
            var polygon_triangulation = new PolygonMeshBuilder(
              'plane polygon',
              plane.polygonDefinition.map(p => new Vector2(p.x, p.z)),
              scene,
              earcut,
            );
            var polygon = polygon_triangulation.build(false, 0.01);
            plane.mesh = polygon; //BABYLON.TubeBuilder.CreateTube("tube", { path: plane.polygonDefinition, radius: 0.02, sideOrientation: BABYLON.Mesh.FRONTSIDE, updatable: true }, scene);
            //}
            planes[plane.id] = plane.mesh;
            const mat = new StandardMaterial('mat', scene);
            mat.alpha = 0.5;
            mat.diffuseColor = Color3.Random();
            polygon.createNormals(true);
            // polygon.receiveShadows = true;
            plane.mesh.material = mat;

            plane.mesh.rotationQuaternion = new Quaternion();
            plane.transformationMatrix.decompose(
              plane.mesh.scaling,
              plane.mesh.rotationQuaternion,
              plane.mesh.position,
            );
          });

          (xrPlanes as any).onPlaneUpdatedObservable.add((plane: any) => {
            console.debug('onPlaneUpdatedObservable');

            const q = new Quaternion();
            plane.transformationMatrix.decompose(
              new Vector3(),
              q,
              new Vector3(),
            );
            const euler = q.toEulerAngles();
            if (Math.abs(euler.x) > 0.1 || Math.abs(euler.z) > 0.1) return;

            let mat;
            if (plane.mesh) {
              mat = plane.mesh.material;
              plane.mesh.dispose(false, false);
            }
            const some = plane.polygonDefinition.some(p => !p);
            if (some) {
              return;
            }
            plane.polygonDefinition.push(plane.polygonDefinition[0]);
            var polygon_triangulation = new PolygonMeshBuilder(
              'plane polygon',
              plane.polygonDefinition.map(p => new Vector2(p.x, p.z)),
              scene,
              earcut,
            );
            var polygon = polygon_triangulation.build(false, 0.01);
            polygon.createNormals(true);
            plane.mesh = polygon; // BABYLON.TubeBuilder.CreateTube("tube", { path: plane.polygonDefinition, radius: 0.02, sideOrientation: BABYLON.Mesh.FRONTSIDE, updatable: true }, scene);
            //}
            planes[plane.id] = plane.mesh;
            plane.mesh.material = mat;
            plane.mesh.rotationQuaternion = new Quaternion();
            plane.transformationMatrix.decompose(
              plane.mesh.scaling,
              plane.mesh.rotationQuaternion,
              plane.mesh.position,
            );
            plane.mesh.receiveShadows = true;
          });

          (xrPlanes as any).onPlaneRemovedObservable.add((plane: any) => {
            console.debug('onPlaneRemovedObservable');
            if (plane && planes[plane.id]) {
              planes[plane.id].dispose();
            }
          });

          xr.baseExperience.sessionManager.onXRSessionInit.add(() => {
            planes.forEach(plane => plane.dispose());
            while (planes.pop()) {}
          });
        }
      }
    })();
  }, [scene, xrSession, camera]);

  return (
    <>
      <View style={props.style}>
        <Button
          title={xrSession ? 'Stop XR' : 'Start XR'}
          onPress={onToggleXr}
        />
        <View style={{flex: 1}}>
          <EngineView camera={camera} displayFrameRate={false} />
          <Text style={{color: 'yellow', position: 'absolute', margin: 3}}>
            {trackingStateToString(trackingState)}
          </Text>
        </View>
      </View>
    </>
  );

  /*  useEffect(() => {
    if (rootNode) {
      rootNode.scaling = new Vector3(scale, scale, scale);
    }
  }, [rootNode, scale]);*/
};

const App = () => <>{/* <ArScreen />*/}</>;

export default App;
