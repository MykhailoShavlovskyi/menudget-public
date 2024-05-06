import styled from "styled-components"
import { PropsWithChildren } from "react"

const StyledContainer = styled.div`
  margin-top: 0.1rem;
  padding: 0 0 1.77rem 1.9rem;

  overflow-x: scroll;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  span {
    cursor: pointer;
    margin-right: 2rem;
    font-size: 0.85rem;
    font-family: "Avenir";
    border-bottom: 1.5px solid #ffbd02;
    letter-spacing: 0.2px;
  }
`

export const Category = ({
  name,
  selected,
  onClick,
}: {
  name: string
  selected: boolean
  onClick: () => void
}) => {
  const color = selected ? "#FFBD02" : "black"
  const borderBottomColor = selected ? "orange" : "white"

  return (
    <span
      style={{
        color,
        borderBottomColor,
        borderBottomWidth: selected ? 2 : 0,
        paddingBottom: selected ? 5 : 0,
      }}
      onClick={onClick}
    >
      {name}
    </span>
  )
}

export const MenuCategories = ({ children }: PropsWithChildren<{}>) => (
  <StyledContainer>{children}</StyledContainer>
)
