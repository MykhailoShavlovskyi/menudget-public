import styled from "styled-components"
import React from "react"
import { array, object, string, TypeOf } from "zod"
import { Form, FormProps } from "../common/form/Form"
import { FormHeader } from "../common/form/FormHeader"
import { id } from "../../../db/validation"
import { useField } from "formik"
import { HamburgerIcon } from "../icons/HamburgerIcon"
import { CrossIcon } from "../icons/CrossIcon"
import { SaveDeleteButtons } from "../common/form/SaveDeleteButtons"
import { noop } from "lodash"
import { Button } from "../common/input/Button"
import { SmallPlusIcon } from "../icons/SmallPlusIcon" //region Schema
import { v4 as uuid } from "uuid"
import { getMsgAllCategories, getMsgNewCategory } from "../../../messages/dishes"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import mergeRefs from "react-merge-refs"

//region Schema

const schema = object({
  categories: array(object({ id: id.or(string()), name: string() })),
})

export type CategoriesFormValues = TypeOf<typeof schema>

//endregion Schema

//region Style

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;

  h2 {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.875rem;
  }
`

const StyledCategoriesContainer = styled.div`
  h2 {
    margin-bottom: 1.25rem;
  }

  & > div {
    gap: 0.7rem;
    display: flex;
    flex-direction: column;
  }
`

const StyledCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  & > input:first-child {
    display: flex;
    padding: 1rem 0.9375rem;
    align-items: center;
    gap: 0.625rem;
    flex-grow: 1;
    border: none;
    outline: none;

    border-radius: 0.625rem;
    background: #f5f5f5;

    color: #161616;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  & > div:not(:first-child) {
    display: flex;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.3125rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  & > div:nth-child(2) {
    cursor: grab;
  }
`

const StyledButton = styled(Button)`
  padding: 0.3125rem;
  display: flex;
  justify-content: center;

  border-radius: 0.625rem;
  background: white;
  border: 2px solid #ff9c00;

  :hover {
    background: #faecc6;
  }
`

const StyledGrow = styled.div`
  flex-grow: 1;
`

const StyledInsertLine = styled.div<{ visible: boolean }>`
  height: 0.5rem;
  width: 100%;
  background: ${(v) => (v.visible ? "#ff8b01" : undefined)};
  border-radius: 1rem;
`
//endregion Style

//region Components

//endregion Components

type Props = Pick<FormProps<typeof schema>, "initialValues" | "onSubmit"> & {
  onClose: () => void
}

let categories: { id: number; name: string; order: number }[] = []

const Category = ({ id, name }: { id: number; name: string }) => {
  const [collected, drag, dragPreview] = useDrag<
    unknown,
    unknown,
    {
      isDragging: boolean
    }
  >({
    type: "category",
    item: { id },
  })

  const [field, _, helpers] = useField("categories")
  categories = field.value
  const [canDropBefore, refLine] = useDrop<{ id: number | string }, unknown, unknown>(() => ({
    accept: "category",
    collect: (m) => m.canDrop() && m.isOver() && m.getItem().id !== id,
    drop: (item) => {
      const cat = categories.find((v) => v.id === id)
      const prepended = categories.find((v) => v.id === item.id)
      if (prepended == null || cat == null) return

      prepended.order = cat.order - 0.5
      categories.sort((a, b) => a.order - b.order)
      categories.forEach((v, i) => (v.order = i))
      helpers.setValue(categories)
    },
  }))

  const handleDelete = () => {
    helpers.setValue(field.value.filter((v) => v.id !== id))
  }

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <>
      <StyledInsertLine visible={!!canDropBefore} />
      <StyledCategory ref={mergeRefs([refLine, drag])} {...collected}>
        <input
          value={name}
          onChange={(e) => {
            const v = field.value.find((v) => v.id === id)
            v.name = e.target.value
            helpers.setValue(field.value)
          }}
        />
        <div>
          <HamburgerIcon />
        </div>
        <div onClick={handleDelete}>
          <CrossIcon />
        </div>
      </StyledCategory>
    </>
  )
}

const Items = () => {
  const [field] = useField("categories")
  const sorted = field.value.sort((a, b) => a.order - b.order)

  return (
    <StyledCategoriesContainer>
      <h2>{getMsgAllCategories()}</h2>
      <div>
        {sorted.map((v) => (
          <Category key={v.id} id={v.id} name={v.name} />
        ))}
      </div>
    </StyledCategoriesContainer>
  )
}

const AddButton = () => {
  const [field, _, helpers] = useField("categories")

  const handleClick = () => {
    const maxOrder =
      Math.max(
        -1,
        field.value.map((v) => v.order)
      ) + 1
    helpers.setValue([...field.value, { id: uuid(), order: maxOrder, name: getMsgNewCategory() }])
  }

  return <StyledButton type={"button"} label={<SmallPlusIcon />} onClick={handleClick} />
}

export const CategoriesForm = ({ initialValues, onSubmit, onClose }: Props) => (
  <>
    <DndProvider backend={HTML5Backend}>
      <StyledForm
        id={"categories-form"}
        schema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <FormHeader name={"categories"} isEditing={true} onClose={onClose} />
        <Items />
        <AddButton />
        <StyledGrow />
        <SaveDeleteButtons isEditing={false} onDelete={noop} saveDisabled={false} />
      </StyledForm>
    </DndProvider>
  </>
)
