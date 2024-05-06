import styled from "styled-components"
import { Button } from "../common/Button"
import { ReactNode } from "react"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.9rem;

  & > div:not(:last-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h4 {
      font-family: Avenir;
      font-size: 0.95rem;
      margin: 0.52rem 0 1rem;
    }

    :not(:first-child) {
      h4 {
        margin-top: 1.32rem;
      }
    }

    :nth-child(3) {
      h4 {
        margin-top: 1.75rem;
      }
    }

    & > div {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      border-bottom: 1.3px solid #eeeeee;
      padding-bottom: 1.5rem;
    }
  }
`

const StyledFilterItem = styled.span<{
  enabled: boolean
}>`
  padding: 0.39rem 2rem;
  white-space: nowrap;
  font-family: Avenir;
  background-color: ${(v) => (v.enabled ? "#ffbd02" : "#F4F4F4")};
  color: ${(v) => (v.enabled ? "white" : "#B2B2B2")};
  font-size: 0.83rem;
  margin: 0.5rem 0.5rem 0.3rem;
  border-radius: 1rem;
  cursor: pointer;
`

const StyledButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 3.3rem 0rem;

  button {
    margin: 0.3rem;
    width: 8.7rem;
    font-size: 1rem;
    padding: 0.7rem 2.6rem;
  }
`

export const FilterItem = ({
  name,
  enabled,
  onToggle,
}: {
  name: string
  enabled: boolean
  onToggle: () => void
}) => (
  <StyledFilterItem enabled={enabled} onClick={onToggle}>
    {name}
  </StyledFilterItem>
)

export const MenuFilterFooterButtons = ({
  onSave,
  onReset,
}: {
  onSave: () => void
  onReset: () => void
}) => (
  <>
    <Button onClick={onSave}>Save</Button>
    <Button onClick={onReset}>Reset</Button>
  </>
)

export const MenuFilters = ({
  categories,
  spicyLevel,
  labels,
  footerButtons,
}: {
  categories: ReactNode
  spicyLevel: ReactNode
  labels: ReactNode
  footerButtons: ReactNode
}) => (
  <StyledContainer>
    <div>
      <h4>Dishes / Menu</h4>
      <div>{categories}</div>
    </div>
    <div>
      <h4>Spicy level</h4>
      {spicyLevel}
    </div>
    <div>
      <h4>Diets / Special</h4>
      <div>{labels}</div>
    </div>
    <StyledButtonContainer>{footerButtons}</StyledButtonContainer>
  </StyledContainer>
)
