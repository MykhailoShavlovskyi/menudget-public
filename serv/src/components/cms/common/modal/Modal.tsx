import ReactModal from "react-modal"
import React, { ReactNode } from "react"
import styled from "styled-components"

export type ModalProps = Pick<ReactModal.Props, "isOpen"> & {
  header?: ReactNode
  footer?: ReactNode
}

export const modalOverlayStyle = {
  zIndex: 2,
  background: "rgba(45,45,45,0.5)",
} as React.CSSProperties

export const modalContentStyle = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  border: "none",
} as React.CSSProperties

const style = {
  overlay: modalOverlayStyle,
  content: {
    ...modalContentStyle,
    display: "inline-flex",
    padding: "5.875rem 2.125rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "5.25rem",
  } as React.CSSProperties,
}

const StyledHeader = styled.h2`
  color: #2d2c38;

  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.375rem;

  margin: 0 2rem;
`

const StyledFooter = styled.footer`
  display: flex;
  gap: 1.875rem;
  width: 100%;
`

export const Modal = ({ isOpen, header, footer }: ModalProps) => (
  <ReactModal isOpen={isOpen} style={style}>
    <StyledHeader>{header}</StyledHeader>
    <StyledFooter>{footer}</StyledFooter>
  </ReactModal>
)
