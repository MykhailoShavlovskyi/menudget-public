import React, { useMemo } from "react"
import Select from "react-select"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import styled from "styled-components"

const StyledSelect = styled(Select)`
  width: 10rem;
  margin-right: 1rem;
`

export const CompanySelect = ({
  restaurants,
  value,
  onChange,
}: {
  restaurants: RestaurantIndex[]
  value?: number
  onChange: (v: number) => void
}) => {
  const options = useMemo(
    () => restaurants.map((v) => ({ value: v.id, label: v.name })),
    [restaurants]
  )

  const option = useMemo(() => options.find((v) => v.value === value), [options, value])

  return (
    <StyledSelect
      id={"company-select"}
      value={option}
      options={options}
      onChange={(v: any) => onChange(v.value)}
    />
  )
}
