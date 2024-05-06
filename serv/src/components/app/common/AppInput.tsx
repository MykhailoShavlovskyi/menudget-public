import styled, { css } from "styled-components"

export const styledInputMixin = css`
  background-color: #f4f4f4;
  color: #b2b2b2;

  ::placeholder {
    color: #b2b2b2;
    opacity: 1;
  }

  ::-ms-input-placeholder {
    color: #b2b2b2;
  }

  border-radius: 1.7rem;
  border: none;
  padding: 1.3rem 1.8rem;
  font-size: 0.95rem;
  font-family: Avenir;
  line-height: 1rem;
  letter-spacing: 0.25px;

  :focus {
    border: 1px solid gray !important;
  }
`

const StyledInput = styled.input`
  ${styledInputMixin}
`

export const Input = StyledInput
