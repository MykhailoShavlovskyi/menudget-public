import { SaveDeleteButtons, SaveDeleteProps } from "./SaveDeleteButtons"
import React, { useCallback } from "react"
import { useModal } from "../modal/useModal"
import { ConfirmDeleteModal } from "../modal/ConfirmDeleteModal"

export const SaveDeleteButtonsWithConfirmModal = ({
  name,
  isEditing,
  saveDisabled,
  onDelete,
}: SaveDeleteProps & {
  name: string
}) => {
  const { isOpen, openModal, closeModal } = useModal()

  const handleDelete = useCallback(() => {
    closeModal()
    onDelete()
  }, [closeModal, onDelete])

  return (
    <>
      <SaveDeleteButtons isEditing={isEditing} saveDisabled={saveDisabled} onDelete={openModal} />
      <ConfirmDeleteModal
        isOpen={isOpen}
        name={name}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />
    </>
  )
}
