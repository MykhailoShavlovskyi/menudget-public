import React from "react"
import { SaveDeleteButtonsWithConfirmModal } from "../form/SaveDeleteButtonsWithConfirmModal"
import { SaveDeleteProps } from "../form/SaveDeleteButtons"
import { useFormikContext } from "formik"

export type FormikSaveDeleteProps = Omit<SaveDeleteProps, "saveDisabled">

export const FormikSaveDeleteButtonsWithConfirmModal = (
  props: FormikSaveDeleteProps & {
    name: string
  }
) => {
  const { dirty } = useFormikContext()
  return <SaveDeleteButtonsWithConfirmModal saveDisabled={!dirty && props.isEditing} {...props} />
}
