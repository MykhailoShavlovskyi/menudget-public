import React, { ChangeEvent, memo, useCallback } from "react"
import { useField } from "formik"
import { Input, InputProps } from "../input/Input"

export const FormikInput = memo(
  ({
    name,
    ...rest
  }: InputProps & {
    name: string
  }) => {
    const [{ onChange, ...field }, form] = useField(name)
    const error = form.touched ? form.error : undefined

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      // Not number
      if (rest.type !== "number") {
        onChange(e)
        return
      }

      // Number
      if (e.target.value === "") {
        onChange(e)
        return
      }
      let v = Number(e.target.value)
      if (rest.min != null && v < rest.min) v = rest.min as number
      if (rest.max != null && v > rest.max) v = rest.max as number
      e.target.value = v.toString()
      if (rest.maxLength != null && e.target.value.length > rest.maxLength)
        e.target.value = e.target.value.slice(0, rest.maxLength)
      onChange(e)
    }, [])

    return <Input error={error} onChange={handleChange} {...field} {...rest} />
  }
)
