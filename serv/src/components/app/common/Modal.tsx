import ReactModal from "react-modal"
import React, { PropsWithChildren } from "react"
import styled from "styled-components"

type Props = PropsWithChildren<Pick<ReactModal.Props, "isOpen">>

const style = {
  overlay: {
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,
  content: {
    borderRadius: "1rem",
    position: "relative",

    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    inset: "unset",
    backgroundColor: "unset",
    border: "none",
  } as React.CSSProperties,
}

const StyledFrame = styled.div`
  width: calc(390px);
  height: calc(844px);
  @media (max-width: 767px) {
    width: 100vw;
    height: 100vh;
  }

  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledContent = styled.div`
  margin: 1.2rem;
  flex: 1;
  background-color: white;
  border-radius: 1rem;
`

export const Modal = ({ isOpen, children, ...rest }: Props) => (
  <ReactModal isOpen={isOpen} style={style}>
    <StyledFrame>
      <StyledContent {...rest}>{children}</StyledContent>
    </StyledFrame>
  </ReactModal>
)
