import styled from "styled-components"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { CompanySelect } from "../shared/CompanySelect"
import React from "react"
import { BackIcon } from "../icons/BackIcon"
import { getMsgOrdersArchive } from "../../../messages/orders"

const StyledContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  svg {
    cursor: pointer;
  }

  h1 {
    margin: 0;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 2.25rem;
  }
`

export const ArchiveHeading = ({
  restaurants,
  restaurantId,
  onGoBack,
  onSelectRestaurant,
}: {
  restaurantId?: number
  restaurants?: RestaurantIndex[]
  onGoBack: () => void
  onSelectRestaurant: (v: number) => void
}) => (
  <StyledContainer>
    <BackIcon onClick={onGoBack} />
    <h1>{getMsgOrdersArchive()}</h1>
    {restaurants && (
      <CompanySelect restaurants={restaurants} value={restaurantId} onChange={onSelectRestaurant} />
    )}
  </StyledContainer>
)
