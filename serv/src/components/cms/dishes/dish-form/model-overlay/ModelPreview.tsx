import React, { Suspense } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Text } from "@react-three/drei"
import { getMsgLoadingModel, getMsgNoModelLoaded } from "../../../../../messages/dishes"

const NoModelPlaceholder = () => (
  // @ts-ignore
  <Text color="red" anchorX="center" anchorY="middle" scale={0.5}>
    {getMsgNoModelLoaded()}
  </Text>
)

const LoadingModelPlaceholder = () => (
  // @ts-ignore
  <Text color="green" anchorX="center" anchorY="middle" scale={0.5}>
    {getMsgLoadingModel()}
  </Text>
)

const Model = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} />
}

export const ModelPreview = ({ url }: { url?: string }) =>
  url == null ? (
    <NoModelPlaceholder />
  ) : (
    <Suspense fallback={<LoadingModelPlaceholder />}>
      <Model url={url} />
    </Suspense>
  )
