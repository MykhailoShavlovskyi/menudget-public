import styled from "styled-components"
import React from "react"
import { Button, ButtonProps } from "../common/input/Button"

const StyledButton = styled(Button)`
  margin-left: 1rem;
  width: 10rem;
`

export const CardsGridAddButton = (props: ButtonProps) => <StyledButton {...props} />
