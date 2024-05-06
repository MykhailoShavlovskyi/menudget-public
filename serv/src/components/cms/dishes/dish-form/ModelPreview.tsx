import React, { Suspense, useEffect, useRef } from "react"
import { useLoader, useThree } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Text } from "@react-three/drei"
import { Box3, PerspectiveCamera, Scene, Vector3 } from "three"
import { LoaderProto } from "@react-three/fiber/dist/declarations/src/core/hooks"
import { adjustControlsAndPosition } from "./ModelPreviewCanvas"

const NoModelPlaceholder = () => (
  // @ts-ignore
  <Text color="red" anchorX="center" anchorY="middle" scale={0.5}>
    No model is uploaded
  </Text>
)

const LoadingModelPlaceholder = () => (
  // @ts-ignore
  <Text color="green" anchorX="center" anchorY="middle" scale={0.5}>
    Loading model...
  </Text>
)

const Model = ({
  url,
  onLoad,
}: {
  url: string
  onLoad: (v: Scene, camera: PerspectiveCamera) => void
}) => {
  const gltf = useLoader(GLTFLoader as LoaderProto<Scene>, url)
  const camera = useThree((v) => v.camera)
  useEffect(() => {
    const center = new Vector3()
    new Box3().expandByObject(gltf.scene, true).getCenter(center)
    gltf.scene.position.sub(center)
    gltf.scene.updateMatrix()
    if (gltf.scene) onLoad(gltf.scene, camera as PerspectiveCamera)
  }, [])
  return <primitive object={gltf.scene} />
}

export const ModelPreview = ({ url }: { url?: string }) => {
  return url == null ? (
    <NoModelPlaceholder />
  ) : (
    <Suspense fallback={<LoadingModelPlaceholder />}>
      <Model url={url} onLoad={adjustControlsAndPosition} />
    </Suspense>
  )
}
