import { CardProps } from "../common/card/Card"
import React from "react"
import styled, { css } from "styled-components"
import { StyledCard } from "../common/card/Card"

const RestyledCard = styled(StyledCard)`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2.625rem 1.875rem;

  ${(v) =>
    v.selected &&
    css`
      padding: calc(2.625rem - 0.25rem) 1.875rem 2.625rem calc(1.875rem - 0.25rem);
    `}

  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`

export const PromoCard = ({ id, name, ...rest }: CardProps & { name: string }) => (
  <RestyledCard id={id?.toString()} {...rest}>
    <h4>{name}</h4>
  </RestyledCard>
)
