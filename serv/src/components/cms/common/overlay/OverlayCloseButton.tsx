import styled from "styled-components"
import { useKey } from "react-use"
import React from "react"

const StyledCloseButton = styled.div`
  width: 25px;
  height: 25px;

  position: absolute;
  top: 2rem;
  right: 2rem;

  cursor: pointer;

  > div {
    height: 25px;
    width: 2px;
    margin-left: 12px;
    background-color: white;
    transform: rotate(45deg);
    z-index: 1;

    > div {
      height: 25px;
      width: 2px;
      background-color: white;
      transform: rotate(90deg);
      z-index: 2;
    }
  }
`

export const OverlayCloseButton = ({ onClick }: { onClick: () => void }) => {
  // Call on click on 'Escape' press
  useKey("Escape", onClick)

  return (
    <StyledCloseButton onClick={onClick}>
      <div>
        <div />
      </div>
    </StyledCloseButton>
  )
}
