import { CrossIcon } from "../icons/CrossIcon"
import styled from "styled-components"

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

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <StyledCloseIcon onClick={onClick}>
    <CrossIcon />
  </StyledCloseIcon>
)
