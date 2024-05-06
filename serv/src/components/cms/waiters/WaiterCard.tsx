import { CardProps } from "../common/card/Card"
import React from "react"
import styled, { css } from "styled-components"
import { StyledCard } from "../common/card/Card"

const RestyledCard = styled(StyledCard)`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2.625rem 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;

  ${(v) =>
    v.selected &&
    css`
      padding: calc(2.625rem - 0.25rem) calc(1.875rem - 0.25rem);
    `}

  h4 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
  }

  span {
    //margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
  }
`

type Props = CardProps & {
  name: string
  email: string
  tableNames: string[]
}

export const WaiterCard = ({ id, name, email, tableNames, ...rest }: Props) => (
  <RestyledCard id={id?.toString()} {...rest}>
    <h4>{name}</h4>
    <span>{email}</span>
    <span>Tables: {tableNames.reduce((p, c) => `${p}, ${c}`)}</span>
  </RestyledCard>
)
