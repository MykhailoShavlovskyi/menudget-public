import styled from "styled-components"

const StyledButton = styled.button<{
  disabled?: boolean
}>`
  color: white;
  font-family: Avenir;
  font-weight: normal;
  font-size: 1.3rem;
  border: none;
  border-radius: 3.75rem;
  background: linear-gradient(
    0.25turn,
    ${(v) => (v.disabled ? "#f4f4f4" : "#ffc500")},
    ${(v) => (v.disabled ? "#aaa" : "#ff8b01")}
  );

  cursor: ${(v) => (v.disabled ? "not-allowed" : "pointer")};

  :active {
    opacity: 0.75;
  }
`

export const Button = StyledButton
