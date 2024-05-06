import React, { memo } from "react"
import { FieldArray } from "formik"

type IProps<T> = {
  list: T[]
  name: string
  ids: string[]
  labels: string[]
  Input: React.FunctionComponent<{
    id?: string
    name: string
    label?: string
  }>
}

function ListItem<T>({
  name,
  Input,
  labels,
  ids,
  index,
}: IProps<T> & {
  index: number
}) {
  const fieldName = `${name}.${index}`
  const label = labels[index]
  const id = ids[index]

  return <Input id={id} name={fieldName} label={label} key={fieldName} />
}

function Flist<T>(props: IProps<T>) {
  return (
    <FieldArray name={props.name}>
      {() => {
        return (
          <>
            {props.list.map((item, i) => (
              <ListItem key={i} index={i} {...props} />
            ))}
          </>
        )
      }}
    </FieldArray>
  )
}

export const FormikList = memo(Flist) as typeof Flist
