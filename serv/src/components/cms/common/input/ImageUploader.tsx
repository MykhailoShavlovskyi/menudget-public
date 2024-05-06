import React, { memo } from "react"
import ImageUploading, { ImageUploadingPropsType } from "react-images-uploading"
import { ExportInterface } from "react-images-uploading/dist/typings"
import { StyledLabel } from "../Label"
import styled from "styled-components"

interface ExtendedExportInterface extends ExportInterface {
  id?: string
  onRemove: (index?: number) => void
  imageListErrors: string[]
}

export type ImageUploaderProps = ImageUploadingPropsType & {
  id?: string
  label?: string
  info?: string
  showClickButton?: boolean
  onBlur: (props: any) => void
  onRemove: (index?: number) => void
  Content: (params: ExtendedExportInterface) => JSX.Element
  imageListErrors?: string[]
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.375rem;

  & > div:first-child {
    display: flex;
    gap: 1.425rem;
  }
`

const StyledInfo = styled.div`
  color: #828282;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.5rem;
`

export const ImageUploader = memo(
  ({
    id,
    label,
    info,
    showClickButton = true,
    onBlur,
    onRemove,
    Content,
    imageListErrors,
    ...rest
  }: ImageUploaderProps) => (
    <StyledContainer tabIndex={0} onBlur={onBlur}>
      <div>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <StyledInfo>{info}</StyledInfo>
      </div>
      <div>
        <ImageUploading dataURLKey="data_url" {...rest}>
          {({ ...props }) => (
            <Content
              id={id}
              onRemove={onRemove}
              imageListErrors={imageListErrors ?? []}
              {...props}
            />
          )}
        </ImageUploading>
      </div>
    </StyledContainer>
  )
)
