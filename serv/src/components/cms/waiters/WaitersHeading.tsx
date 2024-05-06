import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { CompanySelect } from "../shared/CompanySelect"
import React from "react"
import styled from "styled-components"
import { Heading } from "../common/Heading"
import { getHeaWaiters } from "../../../messages/waiters"

const StyledContainer = styled.header`
  display: flex;
  align-items: center;
  margin: 0 0 2.5rem;

  h1 {
    margin: 0 1rem 0 0;
  }
`

export const WaitersHeading = ({
  restaurantId,
  restaurants,
  onSelectRestaurant,
}: {
  restaurantId?: number
  restaurants?: RestaurantIndex[]
  onSelectRestaurant: (v: number) => void
}) => (
  <StyledContainer>
    <Heading id={"waiters-heading"}>{getHeaWaiters()}</Heading>
    {restaurants && (
      <CompanySelect restaurants={restaurants} value={restaurantId} onChange={onSelectRestaurant} />
    )}
  </StyledContainer>
)
