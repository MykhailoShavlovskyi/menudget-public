import React, { memo, useCallback } from "react"
import { useField } from "formik"
import { Checkbox, CheckboxProps } from "../input/Checkbox"

export const FormikCheckBox = memo(
  ({
    name,
    ...rest
  }: CheckboxProps & {
    name: string
  }) => {
    const [field, meta, helpers] = useField(name)
    const message = meta.touched ? meta.error : undefined
    const value = field?.value ?? false

    const handleChange = useCallback(() => helpers.setValue(!value), [field.value, helpers])

    return (
      <Checkbox
        {...field}
        {...rest}
        onChange={handleChange}
        message={message}
        checked={value}
        value={value}
      />
    )
  }
)
