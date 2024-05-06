import React, { memo } from "react"
import styled from "styled-components"
import { StyledLabel } from "../Label"
import { StyledErrorMessage } from "../ErrorMessage"
import { inputStyle } from "./Input"

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 100%;
`

const StyledInput = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: 3.25rem;
  max-height: 8rem;
  ${inputStyle}
`

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  description?: string
  error?: string
}

export const TextArea = memo(({ label, description, error, ...rest }: TextAreaProps) => {
  const id = `${label}_input`

  return (
    <StyledInputContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput id={id} {...rest} />
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </StyledInputContainer>
  )
})
