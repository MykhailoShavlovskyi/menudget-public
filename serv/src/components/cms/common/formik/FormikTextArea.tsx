import React, { memo } from "react"
import { useField } from "formik"
import { TextArea, TextAreaProps } from "../input/TextArea"

export const FormikTextArea = memo(
  ({
    name,
    ...rest
  }: TextAreaProps & {
    name: string
  }) => {
    const [field, form] = useField(name)
    const error = form.touched ? form.error : undefined

    return <TextArea error={error} {...field} {...rest} />
  }
)
