import styled from "styled-components"
import { CrossIcon } from "../../icons/CrossIcon"
import { CloseButton } from "../CloseButton"
import { getHdrCreate, getHdrEdit } from "../../../../messages/common"

const StyledCloseIcon = styled.div`
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.3125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.25rem;
  background-color: #f5f5f5;

  cursor: pointer;

  :hover {
    background-color: transparent;
    transform: scale(1.2);
  }
`

const StyledHeader = styled.h1`
  margin: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;

  color: ${(v) => v.theme.colors.primary.black};
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.375rem;
`

export const FormHeader = ({
  name,
  isEditing,
  onClose,
}: {
  name: string
  isEditing: boolean
  onClose: () => void
}) => (
  <StyledHeader id={"form-header"}>
    {isEditing ? getHdrEdit(name) : getHdrCreate(name)}
    <CloseButton onClick={onClose} />
  </StyledHeader>
)
