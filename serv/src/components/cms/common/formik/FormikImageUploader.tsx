import React, { memo, useCallback } from "react"
import { useField } from "formik"
import { ImageListType } from "react-images-uploading"
import { ImageUploader, ImageUploaderProps as ImageUploaderProps } from "../input/ImageUploader"

type IS3WrittenItem = any // TODO

type Props = Partial<ImageUploaderProps> & {
  name: string
  Content: ImageUploaderProps["Content"]
}

export const FormikImageUploader = memo(({ name, ...rest }: Props) => {
  const [{ value }, { error }, { setValue, setTouched }] =
    useField<(ImageListType | IS3WrittenItem)[]>(name)

  const handleChange = useCallback((value) => setValue([...value]), [setValue])
  const handleBlur = useCallback(() => setTouched(true), [setTouched])
  const handleRemove = useCallback(
    (index: number) => setValue(value.filter((item, i) => index !== i)),
    [setValue, value]
  )
  const errors = error as unknown as string[]

  return (
    <ImageUploader
      value={value}
      showClickButton={!value?.length}
      onChange={handleChange}
      onBlur={handleBlur}
      onRemove={handleRemove}
      imageListErrors={errors}
      {...rest}
    />
  )
})
