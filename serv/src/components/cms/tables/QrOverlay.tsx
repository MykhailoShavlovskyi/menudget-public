import { Overlay } from "../common/overlay/Overlay"
import { OverlayCloseButton } from "../common/overlay/OverlayCloseButton"
import { QrPreview } from "./QrPreview"
import { ForwardedRef, forwardRef } from "react"

export const QrOverlay = forwardRef(
  (
    {
      restaurantId,
      tableId,
      visible,
      onClose,
    }: {
      restaurantId?: number
      tableId?: number
      visible: boolean
      onClose: () => void
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <Overlay visible={visible} closeButton={<OverlayCloseButton onClick={onClose} />}>
      {restaurantId != null && tableId != null && (
        <QrPreview ref={ref} restaurantId={restaurantId} tableId={tableId} />
      )}
    </Overlay>
  )
)
