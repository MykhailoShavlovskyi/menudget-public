import React from "react"
import { useField } from "formik"
import { FormikInput } from "../common/formik/FormikInput"
import { FormikImageUploader } from "../common/formik/FormikImageUploader"
import { ImageUploaderContent } from "../common/formik/ImageUploaderContent"
import { SaveDeleteProps } from "../common/form/SaveDeleteButtons"
import { Form, FormProps } from "../common/form/Form"
import { array, number, object, string, TypeOf, z } from "zod"
import {
  FormikSaveDeleteButtonsWithConfirmModal,
  FormikSaveDeleteProps,
} from "../common/formik/FormikSaveDeleteButtonsWithConfirmModal"
import { SSelect } from "../common/input/Select"
import { WorkingTime } from "./WorkingTimeInput"
import {
  getLblAddBanner,
  getLblAddLogo,
  getLblCurrency,
  getLblDefaultDescription,
  getLblDefaultName,
  getLblDescription,
  getLblManagerEmail,
  getLblName,
} from "../../../messages/restaurants"
import styled from "styled-components"
import { FormHeader } from "../common/form/FormHeader"

//region Schema

const createValidationSchema = object({
  name: string(),
  description: string(),
  currency: z.enum(["eur", "usd"]),
  managerEmail: string().email(),
  openTimes: array(number().min(0).max(24)).length(7),
  closeTimes: array(number().min(0).max(24)).length(7),
})

const updateValidationSchema = createValidationSchema.omit({ managerEmail: true })

export type CreateRestaurantFormValues = TypeOf<typeof createValidationSchema> & {
  logo?: { file: File }[]
  banner?: { file: File }[]
}
export type UpdateRestaurantFormValues = TypeOf<typeof updateValidationSchema> & {
  logo?: { file: File }[]
  banner?: { file: File }[]
}

const getDefaultValues = (): CreateRestaurantFormValues => {
  return {
    name: getLblDefaultName(),
    description: getLblDefaultDescription(),
    currency: "eur",
    managerEmail: "",
    openTimes: [10, 10, 10, 10, 10, 12, 12],
    closeTimes: [22, 22, 22, 22, 22, 20, 20],
  }
}

//endregion Schema

//region Components

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;
`

const NameInput = () => (
  <>
    <FormikInput id={"name-input"} name={"name"} label={getLblName()} />
    <FormikInput id={"description-input"} name={"description"} label={getLblDescription()} />
  </>
)

const options = [
  { label: "€ EUR", value: "eur" },
  { label: "$ USD", value: "usd" },
]
const CurrencySelect = () => {
  const [field, _, helpers] = useField("currency")

  return (
    <SSelect
      id={"currency-input"}
      label={getLblCurrency()}
      options={options}
      value={[field.value]}
      onChange={(v) => helpers.setValue(v[0])}
    />
  )
}

const ManagerEmailInput = () => (
  <FormikInput id={"manager-email-input"} name={"managerEmail"} label={getLblManagerEmail()} />
)

const LogoInput = () => (
  <FormikImageUploader
    id={"logo"}
    label={getLblAddLogo()}
    info={"(size 200x300) TODO"}
    name={"logo"}
    Content={ImageUploaderContent as any}
  />
)

const BannerInput = () => (
  <FormikImageUploader
    id={"banner"}
    label={getLblAddBanner()}
    info={"(size 200x300) TODO"}
    name={"banner"}
    Content={ImageUploaderContent as any}
  />
)

const SaveDeleteButtons = (props: FormikSaveDeleteProps) => (
  <FormikSaveDeleteButtonsWithConfirmModal name={useField("name")[0].value} {...props} />
)

//endregion Components

type Props = Pick<
  FormProps<typeof createValidationSchema | typeof updateValidationSchema>,
  "initialValues" | "onSubmit"
> &
  Pick<SaveDeleteProps, "onDelete"> & {
    onClose: () => void
  }

export const RestaurantForm = ({ initialValues, onSubmit, onDelete, onClose }: Props) => {
  const isEditing = initialValues != null
  return (
    <StyledForm
      id={"restaurant-form"}
      schema={isEditing ? updateValidationSchema : createValidationSchema}
      initialValues={initialValues ?? getDefaultValues()}
      onSubmit={onSubmit}
    >
      <FormHeader name={"restaurant"} isEditing={isEditing} onClose={onClose} />
      <NameInput />
      <CurrencySelect />
      {!isEditing && <ManagerEmailInput />}
      <WorkingTime />
      <LogoInput />
      <BannerInput />
      <SaveDeleteButtons isEditing={isEditing} onDelete={onDelete} />
    </StyledForm>
  )
}
