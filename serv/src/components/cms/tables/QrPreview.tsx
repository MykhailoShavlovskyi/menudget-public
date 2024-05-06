import QRCode from "qrcode.react"
import styled from "styled-components"
import React, { forwardRef } from "react"

const StyledContainer = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledQrCode = styled(QRCode)`
  padding: 0;
  margin: 0;
  border-radius: 36px;
  width: fit-content;
`

export const QrPreview = forwardRef<
  HTMLDivElement,
  {
    restaurantId: number
    tableId: number
  }
>(({ restaurantId, tableId }, ref) => (
  <StyledContainer ref={ref}>
    <StyledQrCode
      value={`https://apps.apple.com/nl/app/x/id333903271/?restaurantId=${restaurantId}&table=${tableId}`}
      size={382}
      fgColor="black"
      includeMargin={true}
    />
  </StyledContainer>
))
