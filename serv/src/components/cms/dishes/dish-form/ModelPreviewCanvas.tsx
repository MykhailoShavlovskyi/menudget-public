import { OrbitControls } from "@react-three/drei"
import { Canvas, Props } from "@react-three/fiber"
import React, { PropsWithChildren, useRef, useState } from "react"
import styled from "styled-components"
import { Object3D, PerspectiveCamera, Vector3 } from "three"
import { useEvent } from "react-use"
import { CameraViewBox } from "../../../../lib/CameraViewBox"

const StyledCanvas = styled(Canvas)`
  cursor: grab;
`

const centerModelEventType = "center-model"

export function adjustControlsAndPosition(object: Object3D, camera: PerspectiveCamera) {
  const cameraBox = new CameraViewBox()

  camera.position.set(100, 300, 200)
  camera.lookAt(0, 0, 0)
  camera.updateMatrix()
  cameraBox.SetViewFromCamera(camera)

  cameraBox.ExpandByObject(object)
  const pos = new Vector3()
  cameraBox.GetCameraPosition(pos)

  camera.position.copy(pos).multiplyScalar(1.75)
  camera.far = pos.length() * 4
  camera.updateProjectionMatrix()
  camera.updateMatrix()
  camera.updateMatrixWorld()

  document.dispatchEvent(
    new CustomEvent(centerModelEventType, {
      detail: { min: pos.length(), max: pos.length() * 3 },
    })
  )
}

export const ModelPreviewCanvas = ({ children, ...rest }: PropsWithChildren<Props>) => {
  const controlsRef = useRef<any>()

  const [minDistance, setMinDistance] = useState(0)
  const [maxDistance, setMaxDistance] = useState(999999999)

  useEvent(
    centerModelEventType,
    (e: CustomEvent) => {
      const size = e.detail
      console.debug(size)
      setMinDistance(e.detail.min)
      setMaxDistance(e.detail.max)
    },
    document
  )

  return (
    <StyledCanvas {...rest}>
      <OrbitControls ref={controlsRef} minDistance={minDistance} maxDistance={maxDistance} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </StyledCanvas>
  )
}
