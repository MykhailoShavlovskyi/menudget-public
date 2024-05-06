import { Modal, ModalProps } from "./Modal"
import React from "react"
import styled from "styled-components"
import { Button } from "../input/Button"
import { getLblCancel, getLblYes, getHdrConfirmDelete } from "../../../../messages/common"

export type ConfirmDeleteModalProps = Pick<ModalProps, "isOpen"> & {
  name: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDeleteModal = ({
  name,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => (
  <Modal
    isOpen={isOpen}
    header={getHdrConfirmDelete(name)}
    footer={
      <>
        <Button id={"confirm-btn"} label={getLblYes()} onClick={onConfirm} />
        <Button id={"cancel-btn"} primary={true} label={getLblCancel()} onClick={onCancel} />
      </>
    }
  />
)

/*
export const ConfirmDeleteModal = ({
  name,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => (
  <Modal
    isOpen={isOpen}
    header={`Are you sure you want to delete '${name}'?`}
    footer={
      <>
        <Button id={"confirm-btn"} label={lblYes()} onClick={onConfirm} />
        <Button id={"cancel-btn"} primary={true} label={lblCancel()} onClick={onCancel} />
      </>
    }
  />
)
 */
