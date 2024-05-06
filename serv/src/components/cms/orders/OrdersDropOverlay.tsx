import styled from "styled-components"
import React from "react"
import { getMsgOrderDropHere } from "../../../messages/orders"

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;

  background-color: rgba(22, 22, 22, 0.53);
  border-style: dashed;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const OrdersDropOverlay = () => (
  <StyledOverlay>
    <h2>{getMsgOrderDropHere()}</h2>
  </StyledOverlay>
)
