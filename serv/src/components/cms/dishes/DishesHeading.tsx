import { Heading } from "../common/Heading"
import React from "react"
import { CompanySelect } from "../shared/CompanySelect"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import styled from "styled-components"
import { getMsgDishes } from "../../../messages/dishes"

const StyledContainer = styled.header`
  display: flex;
  align-items: center;
  margin: 0 0 1.875rem;

  h1 {
    margin: 0 1rem 0 0;
  }
`

export const DishesHeading = ({
  restaurants,
  restaurantId,
  onSelectRestaurant,
}: {
  restaurantId?: number
  restaurants?: RestaurantIndex[]
  onSelectRestaurant: (v: number) => void
}) => (
  <StyledContainer>
    <Heading id={"dishes-heading"}>{getMsgDishes()}</Heading>
    {restaurants && (
      <CompanySelect restaurants={restaurants} value={restaurantId} onChange={onSelectRestaurant} />
    )}
  </StyledContainer>
)
