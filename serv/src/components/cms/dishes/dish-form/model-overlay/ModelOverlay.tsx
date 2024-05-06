import { ModelPreviewOverlay } from "./ModelPreviewOverlay"
import { OverlayCloseButton } from "../../../common/overlay/OverlayCloseButton"
import { useField } from "formik"

export const ModelOverlay = ({ onClose }: { onClose: () => void }) => {
  const [value] = useField("model")
  const modelUrl =
    value?.value[0] instanceof File ? URL.createObjectURL(value.value[0]) : value?.value[0]?.dataURL

  return (
    <ModelPreviewOverlay
      modelUrl={modelUrl}
      closeButton={<OverlayCloseButton onClick={onClose} />}
    />
  )
}
