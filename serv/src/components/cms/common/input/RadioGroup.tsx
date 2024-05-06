import styled, { css } from "styled-components"
import { StyledLabel } from "../Label"

const StyledContainer = styled.div`
  gap: 0.625rem;
  display: flex;
  flex-direction: column;
`

const StyledOptions = styled.div`
  display: flex;
  gap: 1.4375rem;
  flex-wrap: wrap;
`

const StyledOption = styled.div<{
  selected?: boolean
}>`
  display: flex;
  min-width: 6.5775rem;
  width: fit-content;
  padding: 0.625rem;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1rem;
  background: #f5f5f5;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
  cursor: pointer;

  ${(v) =>
    v.selected &&
    css`
      background: #ff9c00;
      color: #fff;
    `};
`

export const RadioGroup = ({
  options,
  label,
  values,
  onAdd,
  onRemove,
  ...rest
}: {
  options: {
    value: string | number
    label: string
  }[]
  label: string
  values: (string | number)[]
  onAdd: (v: string | number) => void
  onRemove: (v: string | number) => void
}) => (
  <StyledContainer {...rest}>
    <StyledLabel>{label}</StyledLabel>
    <StyledOptions>
      {options.map((v) => (
        <StyledOption
          key={v.value}
          className={"option"}
          selected={values.includes(v.value)}
          onClick={() => (values.includes(v.value) ? onRemove(v.value) : onAdd(v.value))}
        >
          {v.label}
        </StyledOption>
      ))}
    </StyledOptions>
  </StyledContainer>
)
