import styled from "styled-components"
import { Button } from "../input/Button"
import React from "react"
import { getLblDelete, getLblSave } from "../../../../messages/common"

export type SaveDeleteProps = {
  isEditing: boolean
  saveDisabled: boolean
  onDelete: () => void
}

const StyledFlexBox = styled.div`
  display: flex;
  gap: 1.25rem;
`

const StyledSaveButton = styled(Button)`
  background: #3cb367;
`

export const SaveDeleteButtons = ({
  isEditing,
  saveDisabled,
  onDelete,
  ...rest
}: SaveDeleteProps) => (
  <StyledFlexBox {...rest}>
    {isEditing && (
      <Button
        id={"delete-btn"}
        type={"button"}
        primary={true}
        label={getLblDelete()}
        onClick={onDelete}
      />
    )}
    <StyledSaveButton disabled={saveDisabled} id={"save-btn"} type="submit" label={getLblSave()} />
  </StyledFlexBox>
)
