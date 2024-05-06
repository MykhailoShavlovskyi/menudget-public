import React, { memo, ReactNode } from "react"
import styled from "styled-components"
import { CheckIcon } from "../../icons/CheckIcon"

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`

const StyledLabel = styled.label`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
`

const StyledFakeInput = styled.div`
  width: 1.625rem;
  height: 1.625rem;
  border: 2px solid #ff9c00;
  border-radius: 0.15rem;
  cursor: pointer;
`

const StyledInput = styled.input`
  display: none;
`

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string | ReactNode
  message?: string
  onChange?: () => void
}

export const Checkbox = memo(({ label, message, onChange, ...rest }: CheckboxProps) => {
  const id = `${label}_input`

  return (
    <StyledContainer>
      <StyledInput type={"checkbox"} id={id} {...rest} />
      <StyledFakeInput onClick={onChange}>{rest.checked && <CheckIcon />}</StyledFakeInput>
      <StyledLabel htmlFor={id} onClick={onChange}>
        {label}
      </StyledLabel>
    </StyledContainer>
  )
})
