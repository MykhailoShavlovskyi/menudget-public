import { StyledCard } from "./Card"
import styled from "styled-components"
import { PlusIcon } from "../../icons/PlusIcon"

const RestyledCard = styled(StyledCard)<{
  horizontal?: boolean
}>`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: ${(v) => (v.horizontal ? "row" : "column")};
  justify-content: center;
  align-items: center;

  color: #ff7a00;
  :hover {
    border: 4px #ff7a00 dashed;
    //min-width: calc(100% + 8px);
    // min-height: calc(100% + 8px);
    //padding-right: 8px;
  }

  h4 {
    margin: ${(v) => (v.horizontal ? " 0 0 0 1.125rem;" : "0.9375rem 0 0")};

    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
  }
`

export const AddNewCard = ({
  label,
  horizontal,
  onClick,
  ...rest
}: {
  label: string
  horizontal?: boolean
  onClick: () => void
}) => (
  <RestyledCard onClick={onClick} horizontal={horizontal} {...rest}>
    <PlusIcon />
    <h4>{label}</h4>
  </RestyledCard>
)
