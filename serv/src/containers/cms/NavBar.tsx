import React from "react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Role } from "../../definitions/Role"
import {
  DishesLink,
  NavBar as NavBarBase,
  OrdersLink,
  PromosLink,
  RestaurantLink,
  RestaurantsLink,
  TablesLink,
  WaitersLink,
} from "../../components/cms/NavBar"

export const NavBar = ({ role }: { role?: string }) => {
  const router = useRouter()
  const route = router.route
  const queryRestaurantId = router.query.restaurantId ?? router.query.id
  const restaurantId = queryRestaurantId ? Number(queryRestaurantId) : undefined
  const rIdString = restaurantId?.toString()

  const restaurants = route.includes(Routes.RestaurantsPage().pathname)
  const dishes = route.includes(Routes.DishesPage().pathname)
  const orders = route.includes(Routes.OrdersPage().pathname)
  const tables = route.includes(Routes.TablesPage().pathname)
  const waiters = route.includes(Routes.WaitersPage().pathname)
  const promos = route.includes(Routes.PromosPage().pathname)
  const settings = route.includes(Routes.ProfilePage().pathname)

  return (
    <NavBarBase settingsOpen={settings}>
      {role === Role.Admin && <RestaurantsLink selected={restaurants} id={rIdString} />}
      {role === Role.Manager && <RestaurantLink selected={restaurants} id={rIdString} />}
      {role !== Role.Waiter && <DishesLink selected={dishes} id={rIdString} />}
      {role !== Role.Waiter && <OrdersLink selected={orders} id={rIdString} />}
      {role !== Role.Waiter && <TablesLink selected={tables} id={rIdString} />}
      {role !== Role.Waiter && <WaitersLink selected={waiters} id={rIdString} />}
      {role !== Role.Waiter && <PromosLink selected={promos} id={rIdString} />}
    </NavBarBase>
  )
}
