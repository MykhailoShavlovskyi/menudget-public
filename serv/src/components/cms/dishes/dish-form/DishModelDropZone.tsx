import { useDropzone } from "react-dropzone"
import { useField } from "formik"
import styled from "styled-components"
import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { StyledLabel } from "../../common/Label"
import { dropAreaCss } from "../../common/formik/ImageUploaderContent"
import { Button } from "../../common/input/Button"
import { createPortal } from "react-dom"
import { ModelOverlay } from "./model-overlay/ModelOverlay"
import { ModelPreviewCanvas } from "./ModelPreviewCanvas"
import { ModelPreview } from "./ModelPreview"
import {
  getLblRemove,
  getMsgAddModel,
  getMsgClickOrDropHere,
  getMsgDropHere,
  getMsgHeight,
  getMsgWidth,
  getMsgDepth,
  getLblOpenPreview,
} from "../../../../messages/dishes"
import { BsFullscreen } from "react-icons/bs"
import { FaTrash } from "react-icons/fa"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.375rem;

  & > div {
    display: flex;
    gap: 1.375rem;
  }
`

const StyledCanvasContainer = styled.div`
  flex-grow: 1;
  width: 10rem;
  height: 15rem;
  position: relative;

  background-color: ${(v) => v.theme.colors.secondary.lightGrey};
  border-radius: 0.5rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.33);
`

const StyledModelActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  button {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border-radius: 0.35rem;
    margin: 0.375rem 0.375rem 0 0;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    svg {
      transform: scale(0.7);
    }

    :hover {
      opacity: 0.5;
    }
  }
`

const StyledDragZone = styled.div`
  text-align: center;
  flex-grow: 1;

  ${dropAreaCss}
  p {
    margin: 0;
  }
`

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const StyledInputLabel = styled.span`
  top: 0;
  right: 0;
  height: 100%;
  width: 4rem;
  background: #dedede;
  border-radius: 0 0.625rem 0.625rem 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`

const StyledFileItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const FileItem = ({
  file,
  index,
  onClick,
}: {
  file?: File
  index: number
  onClick: (index: number) => void
}) => {
  // Get properties
  const name = file?.name ?? "model"

  // Handle click
  const handleClick = useCallback(() => onClick(index), [index, onClick])

  // Render
  if (file == null) return null
  return (
    <StyledFileItem id={"model"} key={file.name}>
      <div>{name}</div>
      <Button label={getLblRemove()} type="button" onClick={handleClick} />
    </StyledFileItem>
  )
}

export const DishModelDropZone = memo(() => {
  // Use file field
  const [{ value }, , { setTouched, setValue }] = useField<Array<File>>("model")

  // Use drop zone
  const handleDrop = useCallback((acceptedFiles) => setValue(acceptedFiles), [setValue])
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop: handleDrop,
  })
  const dropZoneMessage = isDragActive ? (
    <p>{getMsgDropHere()}</p>
  ) : (
    <p>{getMsgClickOrDropHere()}</p>
  )

  // Handle touched drop zone
  const touchedRef = useRef(false)
  useEffect(() => {
    if (isFocused && !touchedRef.current) {
      setTouched(true)
      touchedRef.current = true
    }
  }, [isFocused, setTouched])

  // Handle file remove
  const handleRemove = useCallback(() => setValue([]), [setValue, value])

  // Overlay
  const [overlay, setOverlay] = useState(false)

  const modelUrl =
    value[0] && value[0] instanceof File
      ? URL.createObjectURL(value[0])
      : (value[0] as any)?.dataURL

  return (
    <StyledContainer>
      <StyledLabel>{getMsgAddModel()}</StyledLabel>

      <div id={"model-input"}>
        {modelUrl ? (
          <StyledCanvasContainer>
            <ModelPreviewCanvas>
              <ModelPreview url={modelUrl} />
            </ModelPreviewCanvas>
            <StyledModelActionsContainer>
              <Button label={<FaTrash />} primary onClick={handleRemove} type={"button"} />
              <Button
                label={<BsFullscreen />}
                primary
                onClick={() => setOverlay(true)}
                type={"button"}
              />
            </StyledModelActionsContainer>
          </StyledCanvasContainer>
        ) : (
          <StyledDragZone {...getRootProps()}>
            <input {...getInputProps()} />
            {dropZoneMessage}
          </StyledDragZone>
        )}

        {/*<StyledInputContainer>
          <Input placeholder={"-"}>
            <StyledInputLabel>{getMsgWidth()}</StyledInputLabel>
          </Input>
          <Input placeholder={"-"}>
            <StyledInputLabel>{getMsgHeight()}</StyledInputLabel>
          </Input>
          <Input placeholder={"-"}>
            <StyledInputLabel>{getMsgDepth()}</StyledInputLabel>
          </Input>
        </StyledInputContainer>*/}

        {/*<StyledFilesWrp>
        {value.map((file, i) => (
          <FileItem key={i} file={file} index={i} onClick={handleRemove} />
        ))}
      </StyledFilesWrp>*/}
      </div>
      {overlay && createPortal(<ModelOverlay onClose={() => setOverlay(false)} />, document.body)}
    </StyledContainer>
  )
})
