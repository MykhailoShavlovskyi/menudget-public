import { intl } from "../components/cms/IntlProvider"

export const getLblSave = () =>
  intl.formatMessage({
    defaultMessage: "Save",
    id: "VWI5+f",
    description: "common->form->SaveDeleteButtons.tsx->SaveDeleteButtons",
  })

export const getLblDelete = () =>
  intl.formatMessage({
    defaultMessage: "Delete",
    id: "o76qJC",
    description: "common->form->SaveDeleteButtons.tsx->SaveDeleteButtons",
  })

export const getMsgClickOrDrop = () =>
  intl.formatMessage({
    defaultMessage: "Click or Drop files here",
    id: "8d7OT8",
    description: "common->formik->ImageUploaderContent.tsx->ImageUploaderContent",
  })

export const getHdrConfirmDelete = (name: string) =>
  intl.formatMessage(
    {
      defaultMessage: "Are you sure you want to delete {name}?",
      id: "qIWLBa",
      description: "common->modal->ConfirmDeleteModal.tsx->ConfirmDeleteModal",
    },
    { name: name }
  )

export const getLblYes = () =>
  intl.formatMessage({
    defaultMessage: "yes",
    id: "mtr8HD",
    description: "common->modal->ConfirmDeleteModal.tsx->ConfirmDeleteModal",
  })

export const getLblCancel = () =>
  intl.formatMessage({
    defaultMessage: "cancel",
    id: "Zu7S1p",
    description: "common->modal->ConfirmDeleteModal.tsx->ConfirmDeleteModal",
  })

export const getHdrEdit = (name: string) =>
  intl.formatMessage(
    {
      defaultMessage: "Edit {name}",
      id: "V16hmr",
      description: "common->form->FormHeader.tsx->FormHeader",
    },
    { name: name }
  )
export const getHdrCreate = (name: string) =>
  intl.formatMessage(
    {
      defaultMessage: "Create {name}",
      id: "MIg15T",
      description: "common->form->FormHeader.tsx->FormHeader",
    },
    { name: name }
  )
