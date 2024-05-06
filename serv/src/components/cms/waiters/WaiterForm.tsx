import React from "react"
import styled from "styled-components"
import { useField, useFormikContext } from "formik"
import { FormikInput } from "../common/formik/FormikInput"
import { SaveDeleteProps } from "../common/form/SaveDeleteButtons"
import { Form, FormProps } from "../common/form/Form"
import { array, object, string, TypeOf } from "zod"
import {
  FormikSaveDeleteButtonsWithConfirmModal,
  FormikSaveDeleteProps,
} from "../common/formik/FormikSaveDeleteButtonsWithConfirmModal"
import { RadioGroup } from "../common/input/RadioGroup"
import { FormHeader } from "../common/form/FormHeader"
import { TablePick } from "../../../db/tables/tables"
import { id } from "../../../db/validation"
import {
  getLblEmail,
  getLblName,
  getLblNewWaiter,
  getLblNotes,
  getLblTables,
  getMsgEmailIsRequired,
  getMsgNameIsRequired,
  getMsgNecessaryFields,
} from "../../../messages/waiters"

//region Schema

const getSchema = () => {
  return object({
    name: string().min(1, getMsgNameIsRequired()),
    email: string().min(1, getMsgEmailIsRequired()).email(),
    tableIds: array(id),
  })
}

export type WaiterFormValues = TypeOf<ReturnType<typeof getSchema>>

const getDefaultValues = (): { name: string; tableIds: number[]; email: string } => {
  return {
    name: getLblNewWaiter(),
    email: "",
    tableIds: [],
  }
}

//endregion Schema

//region Style

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;
`

const StyledRadioGroup = styled(RadioGroup)`
  .option {
    min-width: 3.9rem;
  }
`

const StyledNote = styled.div`
  margin-top: -0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
  flex-grow: 1;
`

//endregion Style

//region Components

const NameInput = () => <FormikInput id={"name-input"} name={"name"} label={getLblName()} />

const EmailInput = () => <FormikInput id={"email-input"} name={"email"} label={getLblEmail()} />

const TablesInput = ({ tables }: { tables: TablePick[] }) => {
  const [field] = useField("tableIds")
  const formik = useFormikContext()
  if (tables.length === 0) return null
  return (
    <StyledRadioGroup
      label={getLblTables()}
      options={tables.map((v) => ({ value: v.id, label: v.name }))}
      values={field.value}
      onAdd={(v) => formik.setFieldValue("tableIds", [...field.value, v])}
      onRemove={(v) =>
        formik.setFieldValue(
          "tableIds",
          field.value.filter((x) => x !== v)
        )
      }
    />
  )
}
const NotesInput = () => <FormikInput id={"notes-input"} name={"notes"} label={getLblNotes()} />

const SaveDeleteButtons = (props: FormikSaveDeleteProps) => (
  <FormikSaveDeleteButtonsWithConfirmModal name={useField("name")[0].value} {...props} />
)

//endregion Components

type Props = Pick<FormProps<ReturnType<typeof getSchema>>, "initialValues" | "onSubmit"> &
  Pick<SaveDeleteProps, "onDelete"> & {
    tables: TablePick[]
    onClose: () => void
  }

export const WaiterForm = ({ initialValues, tables, onSubmit, onDelete, onClose }: Props) => {
  const isEditing = initialValues != null
  return (
    <StyledForm
      id={"waiter-form"}
      schema={getSchema()}
      initialValues={initialValues ?? getDefaultValues()}
      onSubmit={onSubmit}
    >
      <FormHeader name={"waiter"} isEditing={isEditing} onClose={onClose} />
      <NameInput />
      <EmailInput />
      <TablesInput tables={tables} />
      <NotesInput />
      <StyledNote>{getMsgNecessaryFields()}</StyledNote>
      <SaveDeleteButtons isEditing={isEditing} onDelete={onDelete} />
    </StyledForm>
  )
}
