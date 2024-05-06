import React, { useEffect, useMemo } from "react"
import styled from "styled-components"
import { useField, useFormikContext } from "formik"
import { FormikInput } from "../common/formik/FormikInput"
import { SaveDeleteProps } from "../common/form/SaveDeleteButtons"
import { Form, FormProps } from "../common/form/Form"
import { array, number, object, string, TypeOf } from "zod"
import {
  FormikSaveDeleteButtonsWithConfirmModal,
  FormikSaveDeleteProps,
} from "../common/formik/FormikSaveDeleteButtonsWithConfirmModal"
import { FormHeader } from "../common/form/FormHeader"
import { currencies } from "../../../lib/currencies"
import { SSelect } from "../common/input/Select"
import { DishIndex } from "../../../db/dishes/dishes"
import { id } from "../../../db/validation"

//region Schema

const schema = object({
  name: string().min(1, "Name is a required field"),
  percentageDiscount: number().min(0).max(100).optional().nullable(),
  fixedDiscount: number().min(0).max(9999).optional().nullable(),
  maxUseCount: number().min(0).optional().nullable(),
  dishIds: array(id),
}).refine((v) => {
  const hasPercentage = v.percentageDiscount == null /*&& v.percentageDiscount !== ""*/
  const hasFixed = v.fixedDiscount == null /*&& v.fixedDiscount !== ""*/
  if (!hasPercentage && !hasFixed) return false
  if (hasPercentage && hasFixed) return false
  return true
}, "Either one of percentage discount or fixed discount must be provided")

export type PromoFormValues = TypeOf<typeof schema>

const defaultValues: PromoFormValues = {
  name: "promo",
  dishIds: [],
}

//endregion Schema

//region Style

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;
`

const StyledDiscountContainer = styled.div`
  display: flex;
`

const StyledOr = styled.span`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1.5rem;

  align-items: center;
  justify-content: center;

  color: #161616;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.875rem;
`

const StyledInputLabel = styled.span`
  top: 0;
  right: 0;
  height: 100%;
  width: 4rem;
  background: #dedede;
  border-radius: 0 0.625rem 0.625rem 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.25rem;
  color: #161616;
  font-weight: 700;
  line-height: 1.5rem;
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

const DiscountInput = ({ currency }: { currency: string }) => {
  const [percentageDiscountField, _, percHelpers] = useField("percentageDiscount")
  const [fixedDiscountField, __, fixesHelpers] = useField("fixedDiscount")

  useEffect(() => {
    if (percentageDiscountField.value === "") percHelpers.setValue(null)
  }, [percentageDiscountField.value])

  useEffect(() => {
    if (fixedDiscountField.value === "") fixesHelpers.setValue(null)
  }, [fixedDiscountField.value])

  return (
    <StyledDiscountContainer>
      <FormikInput
        id={"percentage-discount-input"}
        type={"number"}
        name={"percentageDiscount"}
        label={"Percentage discount*"}
        min={0}
        max={100}
        disabled={fixedDiscountField.value != null && fixedDiscountField.value !== ""}
      >
        <StyledInputLabel>%</StyledInputLabel>
      </FormikInput>
      <StyledOr>or</StyledOr>
      <FormikInput
        id={"fixed-discount-input"}
        type={"number"}
        name={"fixedDiscount"}
        label={"Fixed discount*"}
        min={0}
        max={9999}
        maxLength={4}
        disabled={percentageDiscountField.value != null && percentageDiscountField.value !== ""}
      >
        <StyledInputLabel> {currencies[currency] ?? "$"}</StyledInputLabel>
      </FormikInput>
    </StyledDiscountContainer>
  )
}

const DishSelect = ({ dishes }: { dishes: DishIndex[] }) => {
  const options = useMemo(() => {
    return dishes.map((v) => ({ value: v.id, label: v.name }))
  }, [dishes])

  const [field] = useField("dishIds")
  const formik = useFormikContext()
  const handleChange = (v) => formik.setFieldValue("dishIds", v)

  return (
    <SSelect
      id={"dish-input"}
      label={"Dishes"}
      options={options}
      value={field.value}
      isMulti={true}
      menuPlacement={"top"}
      onChange={handleChange}
    />
  )
}

const SaveDeleteButtons = (props: FormikSaveDeleteProps) => (
  <FormikSaveDeleteButtonsWithConfirmModal name={useField("name")[0].value} {...props} />
)

//endregion Components

type Props = Pick<FormProps<typeof schema>, "initialValues" | "onSubmit"> &
  Pick<SaveDeleteProps, "onDelete"> & {
    currency: string
    dishes: DishIndex[]
    onClose: () => void
  }

export const PromoForm = ({
  initialValues,
  currency,
  dishes,
  onSubmit,
  onDelete,
  onClose,
}: Props) => {
  const isEditing = initialValues != null
  return (
    <StyledForm
      id={"waiter-form"}
      schema={schema}
      initialValues={initialValues ?? defaultValues}
      onSubmit={onSubmit}
    >
      <FormHeader name={"promo"} isEditing={isEditing} onClose={onClose} />
      <FormikInput id={"name-input"} name={"name"} label="Name*" />
      <DiscountInput currency={currency} />
      <FormikInput id={"due-date-input"} name={"dueDate"} label={"Due date"} />
      <FormikInput
        id={"max-use-input"}
        type={"number"}
        name={"maxUse"}
        label={"Max use count"}
        min={0}
      />
      <DishSelect dishes={dishes} />
      <StyledNote>* necessary fields</StyledNote>
      <SaveDeleteButtons isEditing={isEditing} onDelete={onDelete} />
    </StyledForm>
  )
}
