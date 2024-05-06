import styled, { css } from "styled-components"
import React, { PropsWithChildren, ReactNode } from "react"
import { StyleProps } from "../../../../lib/types"

const StyledButton = styled.button<{
  primary?: boolean
}>`
  display: inline-block;
  padding: 0.625rem 1.25rem;
  gap: 0.9375rem;
  width: 100%;

  border: none;
  outline: none;
  border-radius: 0.5rem;
  background: #828282;
  color: white;
  text-align: center;
  font-family: Nunito Sans;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  cursor: pointer;

  ${(v) =>
    v.primary &&
    css`
      background: #ff9c00 !important;
    `}

  :disabled {
    background: #f5f5f5 !important;
    color: #828282 !important;
    cursor: not-allowed;
  }
`

export type ButtonProps = PropsWithChildren<
  StyleProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      label: string | ReactNode
      primary?: boolean
      onClick?: (e: MouseEvent) => void
    }
>

export const Button = ({ label, onClick, ...rest }: ButtonProps) => (
  <StyledButton onClick={onClick} {...rest}>
    {label}
  </StyledButton>
)
