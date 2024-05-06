import styled from "styled-components"
import { useField } from "formik"
import React from "react"
import { SaveDeleteProps } from "../common/form/SaveDeleteButtons"
import { FormikInput } from "../common/formik/FormikInput"
import { object, string, TypeOf } from "zod"
import { Form, FormProps } from "../common/form/Form"
import {
  FormikSaveDeleteButtonsWithConfirmModal,
  FormikSaveDeleteProps,
} from "../common/formik/FormikSaveDeleteButtonsWithConfirmModal"
import {
  getMsgCategoryForm,
  getHdrEditCategory,
  getHdrCreateCategory,
  getLblInputName,
  getMsgNewCategoryDefault,
} from "../../../messages/dishes"

//region Schema

const schema = object({
  name: string().min(3, getMsgCategoryForm()).max(30),
})

export type CategoryFormValues = TypeOf<typeof schema>

const defaultValues: CategoryFormValues = {
  name: getMsgNewCategoryDefault(),
}

//endregion Schema

//region Components

const StyledHeader = styled.h1`
  font-weight: 800;
  margin-top: 0;
`

const Header = ({ isEditing }: { isEditing: boolean }) => (
  <StyledHeader id={"form-header"}>
    {isEditing ? getHdrEditCategory() : getHdrCreateCategory()}
  </StyledHeader>
)

const PropertiesInput = () => (
  <FormikInput id={"name-input"} name={"name"} label={getLblInputName()} />
)

const SaveDeleteButtons = (props: FormikSaveDeleteProps) => (
  <FormikSaveDeleteButtonsWithConfirmModal name={useField("name")[0].value} {...props} />
)

//endregion Components

type Props = Pick<FormProps<typeof schema>, "initialValues" | "onSubmit"> &
  Pick<SaveDeleteProps, "onDelete">

export const CategoryForm = ({ initialValues, onSubmit, onDelete }: Props) => {
  const isEditing = initialValues != null

  return (
    <>
      <Form
        id={"category-form"}
        schema={schema}
        initialValues={initialValues ?? defaultValues}
        onSubmit={onSubmit}
      >
        <Header isEditing={isEditing} />
        <PropertiesInput />
        <SaveDeleteButtons isEditing={isEditing} onDelete={onDelete} />
      </Form>
    </>
  )
}
