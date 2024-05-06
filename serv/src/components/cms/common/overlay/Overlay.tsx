import styled, { css } from "styled-components"
import React, { PropsWithChildren, ReactNode } from "react"

export const StyledModelPreviewOverlay = styled.div<{
  visible: boolean
}>`
  position: fixed;
  /* display: ${(v) => (v.visible ? "block" : "hidden")};*/
  ${(v) =>
    !v.visible &&
    css`
      visibility: hidden;
    `}
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 10;
`

export const Overlay = ({
  visible,
  children,
  closeButton,
}: PropsWithChildren<{
  visible: boolean
  closeButton: ReactNode
}>) => (
  <StyledModelPreviewOverlay visible={visible}>
    {children}
    {closeButton}
  </StyledModelPreviewOverlay>
)
