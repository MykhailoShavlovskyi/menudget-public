import React, { memo } from "react"
import { ImageType } from "react-images-uploading"
import styled, { css } from "styled-components"
import { ExportInterface } from "react-images-uploading/dist/typings"
import { CrossIcon } from "../../icons/CrossIcon"
import { getMsgClickOrDrop } from "../../../../messages/common"

export const dropAreaCss = css`
  display: flex;
  padding: 0.9375rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  border: 3px dashed #ff9c00;
  background: #fff;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.75rem;

  cursor: pointer;

  :hover {
    background: #fff3e2;
    color: #ff9c00;
  }
`

const StyledUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  & > div:first-child {
    ${dropAreaCss}
  }

  & > div:nth-child(2) {
    display: flex;
    gap: 2.5rem;
    flex-wrap: wrap;
  }
`

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.825rem;
  }
`

const StyledCloseIcon = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.3125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.25rem;
  background-color: #ff9c00;

  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`

const StyledImageError = styled.div`
  color: red;
  font-size: small;
`

const ImageItem = ({
  id,
  error,
  file,
  onRemove,
}: {
  id?: string
  error?: string
  file: ImageType
  onRemove: () => void
}) => {
  const key = file.Location ?? file.file?.name
  const src = file["data_url"] || file.dataURL || file.Location

  return (
    <StyledItemContainer>
      <div id={id} key={key}>
        <img src={src} alt="" width="100" />
        <StyledCloseIcon onClick={onRemove}>
          <CrossIcon color={"white"} />
        </StyledCloseIcon>
      </div>
      <StyledImageError>{error}</StyledImageError>
    </StyledItemContainer>
  )
}

export const ImageUploaderContent = memo(
  ({
    id,
    imageList,
    onImageUpload,
    dragProps,
    onRemove,
    imageListErrors = [],
  }: ExportInterface & {
    id?: string
    showClickButton: boolean
    onRemove: (index: number) => void
    imageListErrors: string[]
  }) => (
    <StyledUploaderContainer>
      <div id={`add-${id}-btn`} onClick={onImageUpload} {...dragProps}>
        {getMsgClickOrDrop()}
      </div>
      <div>
        {imageList.map((file: ImageType, index) => (
          <ImageItem
            key={index}
            id={id}
            file={file}
            error={imageListErrors[index]}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </StyledUploaderContainer>
  )
)
