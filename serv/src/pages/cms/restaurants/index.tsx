import { GetServerSideProps } from "next"
import { Grid } from "../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { CardsGrid } from "../../../components/cms/cards-grid/CardsGrid"
import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { getRestaurants, RestaurantPick } from "../../../db/restaurants/restaurants"
import { RestaurantCards } from "../../../containers/cms/restaurants/RestaurantCards"
import { RestaurantsHeading } from "../../../components/cms/restaurants/RestaurantsHeading"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitIndexRestaurants } from "../../../messages/restaurants"

const RestaurantsPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantPick[]
}) => (
  <CmsNav title={getTitIndexRestaurants()} notAllowed={notAllowed} role={role}>
    {restaurants && (
      <Grid
        id={"restaurants"}
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

RestaurantsPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

export default RestaurantsPage
