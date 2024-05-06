import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { CompanySelect } from "../shared/CompanySelect"
import React from "react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Heading } from "../common/Heading"
import { getMsgOrders } from "../../../messages/orders"

const StyledContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 1rem 2rem;
`

export const OrdersHeading = ({
  restaurantId,
  restaurants,
}: {
  restaurantId?: number
  restaurants?: RestaurantIndex[]
}) => {
  const router = useRouter()
  const handleRestaurantSelect = (v: number) => router.push(`${Routes.OrdersPage().pathname}/${v}`)

  return (
    <StyledContainer>
      {restaurants && (
        <CompanySelect
          restaurants={restaurants}
          value={restaurantId}
          onChange={handleRestaurantSelect}
        />
      )}
      <Heading id={"orders-heading"}>{getMsgOrders()}</Heading>
    </StyledContainer>
  )
}
