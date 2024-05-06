import styled from "styled-components"
import { Input } from "../common/AppInput"
import { useCallback } from "react"

const StyledContainer = styled.div`
  padding: 1.77rem;
  padding-right: 2.1rem;

  display: flex;
  align-items: center;

  & > svg {
    position: absolute;
    margin-left: 1.2rem;
  }

  ${Input} {
    height: 2.9rem;
    padding-left: 3.5rem;
    font-size: 0.84rem;
    padding-top: 0.97rem;
    padding-bottom: 0.95rem;
    flex: 1;
    margin-right: 1.8rem;
  }

  div {
    margin-top: 0.2rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`

export const SearchIcon = (props: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M23.0265 20.1597L18.5958 15.7289C19.661 14.1198 20.2843 12.2046 20.2843 10.1421C20.2843 4.54413 15.7401 4.43313e-07 10.1421 4.43313e-07C4.54413 4.43313e-07 0 4.54413 0 10.1421C0 15.7288 4.54413 20.2843 10.1421 20.2843C12.2046 20.2843 14.1195 19.661 15.7287 18.5958L20.1595 23.0268C20.5561 23.4234 21.2021 23.4234 21.5987 23.0268L23.0265 21.5987C23.4232 21.2021 23.4232 20.5563 23.0265 20.1597ZM2.02825 10.1421C2.02825 5.666 5.666 2.01718 10.1421 2.01718C14.6183 2.01718 18.2558 5.666 18.2558 10.1421C18.2558 14.6183 14.6183 18.2558 10.1421 18.2558C5.666 18.2558 2.02825 14.6183 2.02825 10.1421Z"
      fill="#B2B2B2"
    />
  </svg>
)

const FilterButton = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => {
  const handlePress = useCallback(() => onChange(!value), [onChange, value])

  return (
    <div>
      <svg width="29" height="30" viewBox="0 0 31 32" fill="none" onClick={handlePress}>
        <path
          d="M10.211 20.8286H5.11105C4.40839 20.8286 3.83074 21.3953 3.83074 22.1093V24.6593H1.28075C0.578087 24.6593 0 25.2261 0 25.9401C0 26.6427 0.578087 27.2093 1.28075 27.2093H3.83074V29.7593C3.83074 30.4733 4.40839 31.04 5.11105 31.04H10.211C10.925 31.04 11.4918 30.4733 11.4918 29.7593V22.1093C11.4918 21.3953 10.925 20.8286 10.211 20.8286ZM29.3643 24.6593H14.0418V27.2093H29.3643C30.067 27.2093 30.634 26.6427 30.634 25.9401C30.634 25.2261 30.067 24.6593 29.3643 24.6593ZM1.28075 16.9978H16.6033V19.5478C16.6033 20.2505 17.1699 20.8286 17.8725 20.8286H22.984C23.6867 20.8286 24.2533 20.2505 24.2533 19.5478V11.8978C24.2533 11.1838 23.6867 10.6171 22.984 10.6171H17.8725C17.1699 10.6171 16.6033 11.1838 16.6033 11.8978V14.4478H1.28075C0.578087 14.4478 0 15.0144 0 15.7171C0 16.4311 0.578087 16.9978 1.28075 16.9978ZM29.3643 14.4478H26.8143V16.9978H29.3643C30.067 16.9978 30.634 16.4311 30.634 15.7171C30.634 15.0144 30.067 14.4478 29.3643 14.4478ZM1.28075 6.78678H3.83074V9.33677C3.83074 10.0508 4.40839 10.6171 5.11105 10.6171H10.211C10.925 10.6171 11.4918 10.0508 11.4918 9.33677V1.68679C11.4918 0.972792 10.925 0.406038 10.211 0.406038H5.11105C4.40839 0.406038 3.83074 0.972792 3.83074 1.68679V4.23678H1.28075C0.578087 4.23678 0 4.80336 0 5.50603C0 6.22002 0.578087 6.78678 1.28075 6.78678ZM29.3643 4.23678H14.0418V6.78678H29.3643C30.067 6.78678 30.634 6.22002 30.634 5.50603C30.634 4.80336 30.067 4.23678 29.3643 4.23678Z"
          fill={value ? "#FFBD02" : "#B2B2B2"}
        />
      </svg>
    </div>
  )
}

export const MenuSearch = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: {
  search: string
  filter: boolean
  onSearchChange: (v: string) => void
  onFilterChange: (v: boolean) => void
}) => (
  <StyledContainer>
    <SearchIcon />
    <Input
      placeholder={"Search food"}
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <FilterButton value={filter} onChange={() => onFilterChange(!filter)} />
  </StyledContainer>
)
