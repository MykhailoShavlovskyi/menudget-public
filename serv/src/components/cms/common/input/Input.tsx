import React, { memo, PropsWithChildren } from "react"
import styled, { css } from "styled-components"
import { StyledLabel } from "../Label"
import { StyledErrorMessage } from "../ErrorMessage"

const StyledContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;

  ${(v) =>
    v.disabled &&
    css`
       {
        cursor: not-allowed;
        opacity: 0.75;

        label {
          cursor: not-allowed;
        }
      }
    `}
`

export const inputStyle = css`
  display: flex;
  padding: 1rem 0.9375rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  width: 100%;

  border-radius: 0.625rem;
  border: none;
  outline: none;
  color: #161616;
  font-family: Nunito Sans;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
  background: #f5f5f5;

  &:disabled {
    cursor: not-allowed;
  }
`

const StyledInput = styled.input`
  ${inputStyle}
`

const StyledDescription = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
`

export type InputProps = PropsWithChildren<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    description?: string
    error?: string
  }
>

export const Input = memo(({ label, description, error, children, ...rest }: InputProps) => {
  const id = `${label}_input`

  return (
    <StyledContainer disabled={rest.disabled}>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <div style={{ position: "relative" }}>
        <StyledInput id={id} {...rest} />
        {children}
      </div>
      {description && <StyledDescription>{description}</StyledDescription>}
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </StyledContainer>
  )
})
