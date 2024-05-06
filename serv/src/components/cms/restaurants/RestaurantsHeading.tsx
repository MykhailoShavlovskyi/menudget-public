import React from "react"
import { Heading } from "../common/Heading"
import { getHeaRestaurants } from "../../../messages/restaurants"

export const RestaurantsHeading = () => (
  <Heading id="restaurants-heading">{getHeaRestaurants()}</Heading>
)
