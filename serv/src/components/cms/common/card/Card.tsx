import styled, { css } from "styled-components"
import { PropsWithChildren } from "react"

export type CardProps = PropsWithChildren<{
  id?: string | number
  selected?: boolean
  onClick?: () => void
  onDoubleClick?: () => void
}>

export const StyledCard = styled.div<CardProps>`
  border-radius: 0.625rem;
  background-color: ${(v) => v.theme.colors.primary.white};
  overflow: hidden;
  min-width: 100%;
  min-height: 100%;

  ${(v) =>
    v.selected &&
    css`
      border: 4px solid #ff7a00;
    `}

  /*box-shadow: ${(v) => v.theme.elevation.light};
  transition-property: transform, box-shadow;
  transition: 0.33s ease-out;
  :hover {
    box-shadow: ${(v) => v.theme.elevation.large};
    transform: translateY(-0.1em);
  }*/

  cursor: pointer;
`
