import styled from "styled-components"
import { FieldArray, useField, useFormikContext } from "formik"
import React from "react"
import { SaveDeleteProps } from "../../common/form/SaveDeleteButtons"
import { FormikInput } from "../../common/formik/FormikInput"
import { ImageUploaderContent } from "../../common/formik/ImageUploaderContent"
import { FormikImageUploader } from "../../common/formik/FormikImageUploader"
import { DishModelDropZone } from "./DishModelDropZone"
import { FormikCheckboxWithName } from "../../common/formik/FormikCheckboxWithName"
import { DishLabel } from "../../../../definitions/DishLabel"
import { array, boolean, number, object, string, TypeOf, z } from "zod"
import { Form, FormProps } from "../../common/form/Form"
import {
  FormikSaveDeleteButtonsWithConfirmModal,
  FormikSaveDeleteProps,
} from "../../common/formik/FormikSaveDeleteButtonsWithConfirmModal"
import { FormikTextArea } from "../../common/formik/FormikTextArea"
import { SSelect } from "../../common/input/Select"
import { Category } from "@prisma/client"
import { FormHeader } from "../../common/form/FormHeader"
import { StyledLabel } from "../../common/Label"
import { ChilliIcon } from "../../icons/ChilliIcon"
import { fillByIndex } from "../../../../lib/fillByIndex"
import { GrayChillIcon } from "../../icons/GrayChillIcon"
import { id } from "../../../../db/validation"
import { MarketingToolsInput } from "./MarketingToolsInput"
import {
  getLblGr,
  getLblKg,
  getLblL,
  getLblMl,
  getLblAddImages,
  getLblCalories,
  getLblCarbs,
  getLblCategory,
  getLblDescription,
  getLblDiscount,
  getLblFat,
  getLblIngredients,
  getLblMeasurementUnit,
  getLblMeasurementValue,
  getLblName,
  getLblPrice,
  getLblProtein,
  getMsgColorIsNotValid,
  getMsgDescriptionShould,
  getMsgDishDescription,
  getMsgIngredientsShould,
  getMsgLabelShould,
  getMsgNameShould,
  getMsgNewDish,
  getMsgNutrition,
  getMsgSpicyLevel,
  getLblAllergens,
} from "../../../../messages/dishes"
import { Sticker } from "../../../../definitions/Sticker"

//region Schema

const getSchema = () => {
  return object({
    name: string().min(3, getMsgNameShould()).max(30),
    description: string().min(3, getMsgDescriptionShould()).max(100),
    ingredients: string().min(3, getMsgIngredientsShould()),
    categoryId: id,
    measurementUnit: string().max(10),
    measurementValue: number().positive(),
    price: number().positive(),
    discount: number().int().min(0).max(100).optional().nullable().or(string().max(0)),
    calories: number().int().positive().optional().nullable().or(string().max(0)),
    fat: number().positive().optional().nullable().or(string().max(0)),
    protein: number().positive().optional().nullable().or(string().max(0)),
    carbs: number().positive().optional().nullable().or(string().max(0)),
    spicyLevel: number().int().min(0).max(5),
    labels: array(
      object({
        name: z.enum(Object.keys(DishLabel) as [string, ...string[]]),
        checked: boolean(),
      }).optional()
    ).min(1, getMsgLabelShould()),

    colorBorder: boolean(),
    color: string()
      .regex(new RegExp("^#[0-9a-fA-F]{6}"), getMsgColorIsNotValid())
      .nullable()
      .optional(),
    sticker: z
      .enum(Object.keys(Sticker) as [string, ...string[]])
      .optional()
      .nullable(),

    images: array(object({})),
    model: array(object({})),
  })
}

export type DishFormValues = TypeOf<ReturnType<typeof getSchema>>

const getDefaultValues = (): {
  //featured: { checked: boolean }
  //topOfTheWeek: { checked: boolean }
  images: any[]
  measurementValue: number
  description: string
  spicyLevel: number
  colorBorder: boolean
  measurementUnit: string
  labels: { name: string; checked: boolean }[]
  price: number
  name: string
  ingredients: string
  model: any[]
  categoryId: number
} => {
  return {
    name: getMsgNewDish(),
    description: getMsgDishDescription(),
    ingredients: "",
    categoryId: -1,
    measurementUnit: "gr",
    measurementValue: 1,
    price: 1,
    spicyLevel: 0,
    labels: Object.values(DishLabel).map((v) => ({ name: v, checked: false })),

    //featured: { checked: false },
    //topOfTheWeek: { checked: false },
    colorBorder: false,

    images: [],
    model: [],
  }
}

//endregion Schema

//region Style

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;
`

const StyledFlex = styled.div`
  display: flex;
  gap: 2.375rem;
`

const StyledNutritionHeader = styled.h3`
  margin: 0 0 1.375rem;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.875rem;
`

const StyledSpicyLevelContainer = styled.div`
  div {
    display: flex;
    gap: 0.625rem;
  }
`

const StyledChilli = styled(ChilliIcon)`
  cursor: pointer;
`

const StyledGrayChilli = styled(GrayChillIcon)`
  cursor: pointer;
`

const StyledLabelsInputGrid = styled.div`
  margin-top: 1.375rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5rem 0;
  align-items: center;
`

//endregion Style

//region Components

const CategorySelect = ({ categories }: { categories: Pick<Category, "id" | "name">[] }) => {
  const options = categories.map((v) => ({ value: v.id, label: v.name }))
  const [field] = useField("categoryId")
  const formik = useFormikContext()

  return (
    <SSelect
      id={"category-input"}
      label={getLblCategory()}
      options={options}
      value={[field.value]}
      onChange={(v) => formik.setFieldValue("categoryId", v[0])}
    />
  )
}

const MeasurementUnitSelect = () => {
  const [field] = useField("measurementUnit")
  const formik = useFormikContext()
  const measurementUnitOptions = [
    { value: "gr", label: getLblGr() },
    { value: "kg", label: getLblKg() },
    { value: "ml", label: getLblMl() },
    { value: "l", label: getLblL() },
  ]

  return (
    <SSelect
      id={"measurement-unit-input"}
      label={getLblMeasurementUnit()}
      options={measurementUnitOptions}
      value={[field.value]}
      onChange={(v) => formik.setFieldValue("measurementUnit", v[0])}
    />
  )
}

const SpicyLevelInput = () => {
  const [field] = useField("spicyLevel")
  const formik = useFormikContext()

  return (
    <StyledSpicyLevelContainer>
      <StyledLabel htmlFor={"spicy-level-input"}>{getMsgSpicyLevel()}</StyledLabel>
      <div>
        {fillByIndex(
          (i) =>
            field.value >= i + 1 ? (
              <StyledChilli key={i} onClick={() => formik.setFieldValue("spicyLevel", i + 1)} />
            ) : (
              <StyledGrayChilli key={i} onClick={() => formik.setFieldValue("spicyLevel", i + 1)} />
            ),
          5
        )}
      </div>
    </StyledSpicyLevelContainer>
  )
}

const LabelsInput = () => (
  <div>
    <StyledLabel>{getLblAllergens()}</StyledLabel>
    <StyledLabelsInputGrid>
      <FieldArray name={"labels"}>
        {() => (
          <>
            {Object.values(DishLabel).map((value, index) => (
              <FormikCheckboxWithName
                key={value}
                id={`${value.toLowerCase()}-input`}
                name={`labels.${index}`}
                label={value}
              />
            ))}
          </>
        )}
      </FieldArray>
    </StyledLabelsInputGrid>
  </div>
)

const SaveDeleteButtons = (props: FormikSaveDeleteProps) => (
  <FormikSaveDeleteButtonsWithConfirmModal name={useField("name")[0].value} {...props} />
)

//endregion Components

type Props = Pick<FormProps<ReturnType<typeof getSchema>>, "initialValues" | "onSubmit"> &
  Pick<SaveDeleteProps, "onDelete"> & {
    categories: Pick<Category, "id" | "name">[]
    onClose: () => void
  }

export const DishForm = ({ initialValues, categories, onSubmit, onDelete, onClose }: Props) => {
  const isEditing = initialValues != null
  const defaultValues = getDefaultValues()
  defaultValues.categoryId = categories[0]?.id as number

  return (
    <>
      <StyledForm
        id={"dish-form"}
        schema={getSchema()}
        initialValues={initialValues ?? defaultValues}
        onSubmit={onSubmit}
      >
        {/*Header*/}
        <FormHeader name={"dish"} isEditing={isEditing} onClose={onClose} />

        {/*Props*/}
        <FormikInput id={"name-input"} name={"name"} label={getLblName()} />
        <FormikTextArea id={"description-input"} name={"description"} label={getLblDescription()} />
        <FormikTextArea id={"ingredients-input"} name={"ingredients"} label={getLblIngredients()} />
        <CategorySelect categories={categories} />
        <StyledFlex>
          <MeasurementUnitSelect />
          <FormikInput
            id={"measurement-value-input"}
            type={"number"}
            name={"measurementValue"}
            label={getLblMeasurementValue()}
          />
        </StyledFlex>
        <FormikInput id={"price-input"} type={"number"} name={"price"} label={getLblPrice()} />
        <FormikInput
          id={"discount-input"}
          type={"number"}
          name={"discount"}
          min={0}
          max={100}
          label={getLblDiscount()}
        />
        <div>
          <StyledNutritionHeader>{getMsgNutrition()}</StyledNutritionHeader>
          <StyledFlex>
            <FormikInput
              id={"calories-input"}
              type={"number"}
              name={"calories"}
              label={getLblCalories()}
            />
            <FormikInput id={"fat-input"} type={"number"} name={"fat"} label={getLblFat()} />
          </StyledFlex>
        </div>
        <StyledFlex>
          <FormikInput
            id={"protein-input"}
            type={"number"}
            name={"protein"}
            label={getLblProtein()}
          />
          <FormikInput id={"carbs-input"} type={"number"} name={"carbs"} label={getLblCarbs()} />
        </StyledFlex>
        <SpicyLevelInput />

        {/*Files*/}
        <LabelsInput />
        <FormikImageUploader
          id={"images"}
          label={getLblAddImages()}
          info={"(size 200x300) TODO"}
          name={"images"}
          showClickButton
          multiple
          Content={ImageUploaderContent as any}
        />
        {/*<ModelPreviewButton onClick={() => setOverlay(true)} />*/}
        <DishModelDropZone />

        {/*Marketing*/}
        <MarketingToolsInput />

        {/*Buttons*/}
        <SaveDeleteButtons isEditing={isEditing} onDelete={onDelete} />
      </StyledForm>
    </>
  )
}
