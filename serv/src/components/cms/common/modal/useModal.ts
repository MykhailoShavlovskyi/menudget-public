import {useCallback, useState} from "react"

/**
 * Use to handle modal opening and closing
 */
export function useModal() {
  // Modal state
  const [isOpen, setOpen] = useState(false)

  // Callbacks
  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  return { isOpen, openModal, closeModal }
}
