import React, { useMemo } from "react"
import styled from "styled-components"
import { useField, useFormikContext } from "formik"
import { FormikInput } from "../common/formik/FormikInput"
import { SaveDeleteProps } from "../common/form/SaveDeleteButtons"
import { array, object, string, TypeOf, z } from "zod"
import { Form, FormProps } from "../common/form/Form"
import {
  FormikSaveDeleteButtonsWithConfirmModal,
  FormikSaveDeleteProps,
} from "../common/formik/FormikSaveDeleteButtonsWithConfirmModal"
import { FormHeader } from "../common/form/FormHeader"
import { SSelect } from "../common/input/Select"
import { RadioGroup } from "../common/input/RadioGroup"
import { noop } from "lodash"
import { Waiter, WaiterIndex } from "../../../db/waiters/waiters"
import { id } from "../../../db/validation"
import {
  getLblDescription,
  getLblName,
  getLblNewTable,
  getLblOccupancy,
  getLblWaiter,
  getMsgNameIsRequired,
} from "../../../messages/tables"

//region Schema

const getSchema = () => {
  return object({
    name: string().min(1, getMsgNameIsRequired()),
    occupancy: z.enum(["1-2", "3-6", "6-8", "8+"]),
    waiterIds: array(id),
  })
}

export type TableFormValues = TypeOf<ReturnType<typeof getSchema>>

const getDefaultValues = (): { waiterIds: number[]; occupancy: string; name: string } => {
  return {
    name: getLblNewTable(),
    occupancy: "3-6",
    waiterIds: [],
  }
}

//endregion Schema

//region Style

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;
`

const StyledRadioGroup = styled(RadioGroup)`
  flex-grow: 1;
  gap: 1.375rem;
`

//endregion Style

//region Components

const NameInput = () => (
  <FormikInput
    id={"name-input"}
    name={"name"}
    label={getLblName()}
    description={getLblDescription()}
  />
)

const WaiterSelect = ({ waiters }: { waiters: WaiterIndex[] }) => {
  const options = useMemo(() => {
    return waiters.map((v) => ({ value: v.id, label: v.name }))
  }, [waiters])

  const [field] = useField("waiterIds")
  const formik = useFormikContext()
  const handleChange = (v) => formik.setFieldValue("waiterIds", v)

  return (
    <SSelect
      id={"waiter-input"}
      label={getLblWaiter()}
      options={options}
      value={field.value}
      isMulti={true}
      onChange={handleChange}
    />
  )
}

const OccupancyInput = () => {
  const [field] = useField("occupancy")
  const formik = useFormikContext()

  return (
    <StyledRadioGroup
      label={getLblOccupancy()}
      options={[
        { value: "1-2", label: "1-2" },
        { value: "3-6", label: "3-6" },
        { value: "6-8", label: "6-8" },
        { value: "8+", label: "8+" },
      ]}
      values={[field.value]}
      onAdd={(v) => formik.setFieldValue("occupancy", v)}
      onRemove={noop}
    />
  )
}

const SaveDeleteButtons = (props: FormikSaveDeleteProps) => (
  <FormikSaveDeleteButtonsWithConfirmModal name={useField("name")[0].value} {...props} />
)

//endregion Components

type Props = Pick<FormProps<ReturnType<typeof getSchema>>, "initialValues" | "onSubmit"> &
  Pick<SaveDeleteProps, "onDelete"> & {
    waiters: WaiterIndex[]
    onClose: () => void
  }

export const TableForm = ({ initialValues, waiters, onSubmit, onDelete, onClose }: Props) => {
  const isEditing = initialValues != null
  return (
    <StyledForm
      id={"table-form"}
      schema={getSchema()}
      initialValues={initialValues ?? getDefaultValues()}
      onSubmit={onSubmit}
    >
      <FormHeader name={"table"} isEditing={isEditing} onClose={onClose} />
      <NameInput />
      <WaiterSelect waiters={waiters} />
      <OccupancyInput />
      <SaveDeleteButtons isEditing={isEditing} onDelete={onDelete} />
    </StyledForm>
  )
}
