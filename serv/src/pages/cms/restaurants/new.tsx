import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { getRestaurants, RestaurantPick } from "../../../db/restaurants/restaurants"
import { Grid } from "../../../components/cms/common/Grid"
import { CardsGrid } from "../../../components/cms/cards-grid/CardsGrid"
import React, { ReactNode } from "react"
import { RestaurantForm } from "../../../containers/cms/restaurants/RestaurantForm"
import { RestaurantCards } from "../../../containers/cms/restaurants/RestaurantCards"
import { RestaurantsHeading } from "../../../components/cms/restaurants/RestaurantsHeading"
import WaitersPage from "../waiters"
import RestaurantPage from "./[id]"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitNewRestaurant } from "../../../messages/restaurants"

const NewRestaurantPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantPick[]
}) => (
  <CmsNav title={getTitNewRestaurant()} notAllowed={notAllowed} role={role}>
    {restaurants && (
      <Grid
        id={"restaurants"}
        aside={<RestaurantForm />}
        main={
          <CardsGrid
            heading={<RestaurantsHeading />}
            cards={<RestaurantCards restaurants={restaurants} />}
          />
        }
      />
    )}
  </CmsNav>
)

NewRestaurantPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ ctx }) => {
  const role = getRole(ctx)

  // Anon
  if (role == null)
    return {
      redirect: {
        destination: Routes.LoginPage().href,
        permanent: false,
      },
    }

  // User
  if (role === Role.User) return { props: { notAllowed: true } }

  // Waiter
  const user = await getUser(ctx)
  if (user == null) return { redirect: { destination: Routes.LoginPage().href, permanent: false } }
  if (role === Role.Waiter) {
    return {
      redirect: {
        destination: `${Routes.OrdersPage().href}/${user.restaurantId}`,
        permanent: false,
      },
    }
  }

  // Manager
  if (role === Role.Manager) {
    return {
      redirect: {
        destination: Routes.RestaurantPage({ id: user.restaurantId?.toString() ?? "" }).href,
        permanent: false,
      },
    }
  }

  // Admin
  const restaurants = await getRestaurants()
  return { props: { role, restaurants } }
})

export default NewRestaurantPage
