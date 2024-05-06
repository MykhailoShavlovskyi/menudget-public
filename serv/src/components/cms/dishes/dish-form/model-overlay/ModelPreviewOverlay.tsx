import React, { ReactNode } from "react"
import { ModelPreviewCanvas } from "../ModelPreviewCanvas"
import { ModelPreview } from "../ModelPreview"
import { Overlay } from "../../../common/overlay/Overlay"

export const ModelPreviewOverlay = ({
  modelUrl,
  closeButton,
}: {
  modelUrl?: string
  closeButton: ReactNode
}) => (
  <Overlay closeButton={closeButton} visible={true}>
    <ModelPreviewCanvas>
      <ModelPreview url={modelUrl} />
    </ModelPreviewCanvas>
  </Overlay>
)
