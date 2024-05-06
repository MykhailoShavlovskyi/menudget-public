import styled from "styled-components"
import Select, { StylesConfig } from "react-select"
import { StyledLabel } from "../Label"
import React from "react"
import { StyledErrorMessage } from "../ErrorMessage"
import { isArray } from "lodash"
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  align-self: stretch;
  width: 100%;
`

type Option = {
  value: string | number
  label: string
}

const defaultStyles: StylesConfig<Option> = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),
  control: (styles) => ({
    ...styles,
    display: "flex",
    padding: "0.563rem 0.9375rem",
    alignItems: "center",
    gap: "0.8125rem",
    alignSelf: "stretch",
    borderRadius: "0.625rem",
    background: "#F5F5F5",
    border: "none",
    boxShadow: "none",
  }),
  valueContainer: (styles) => ({ ...styles, margin: 0, padding: 0 }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
    color: "#161616",
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  indicatorsContainer: (styles) => ({ ...styles, padding: 0, margin: 0 }),
  menu: (styles) => ({
    ...styles,
    borderRadius: "0.625rem",
    background: "#F5F5F5",
  }),
  option: (styles, state) => {
    return {
      ...styles,
      backgroundColor: state.isSelected ? "#FF9C00" : "#F5F5F5",
      ":active": {
        backgroundColor: "#fcd19a",
        color: "white",
      },
    }
  },
}

export const SSelect = ({
  id,
  label,
  searchable = false,
  options,
  value,
  inputValue,
  placeholder,
  error,
  isMulti,
  styles,
  onChange,
  ...rest
}: {
  id?: string
  label?: string
  searchable?: boolean
  options: Option[]
  value?: (string | number)[]
  inputValue?: string
  placeholder?: string
  error?: string
  isMulti?: boolean
  selectProps?: StateManagerProps
  onChange: (v: (string | number)[]) => void
} & StateManagerProps) => {
  const v =
    value != null
      ? isMulti
        ? value.map((v) => options.find((o) => o.value === v))
        : [options.find((o) => o.value === value[0])]
      : undefined

  const handleChange = (v) =>
    isArray(v) ? onChange(v.map((v) => v.value)) : onChange(v ? [v.value] : [])

  return (
    <StyledContainer>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <Select
        isSearchable={searchable}
        styles={Object.assign(defaultStyles, styles) as any}
        options={options}
        placeholder={placeholder}
        value={v}
        inputValue={inputValue}
        isMulti={isMulti}
        onChange={handleChange}
        {...rest}
      />
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </StyledContainer>
  )
}
