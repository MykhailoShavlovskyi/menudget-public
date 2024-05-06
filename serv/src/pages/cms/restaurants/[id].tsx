import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { getRestaurant, getRestaurants, RestaurantPick } from "../../../db/restaurants/restaurants"
import React, { ReactNode } from "react"
import { Grid } from "../../../components/cms/common/Grid"
import { CardsGrid } from "../../../components/cms/cards-grid/CardsGrid"
import { RestaurantCards } from "../../../containers/cms/restaurants/RestaurantCards"
import { RestaurantForm } from "../../../containers/cms/restaurants/RestaurantForm"
import { Restaurant } from "@prisma/client"
import { RestaurantsHeading } from "../../../components/cms/restaurants/RestaurantsHeading"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitRestaurants } from "../../../messages/restaurants"

const Cards = ({ role, restaurants }: { role?: string; restaurants: RestaurantPick[] }) => {
  if (role !== Role.Admin) return null
  return <RestaurantCards restaurants={restaurants} />
}

const RestaurantPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
  restaurant,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantPick[]
  restaurant?: Restaurant
}) => (
  <CmsNav
    title={restaurant ? `${restaurant.name} - Menudget` : getTitRestaurants()}
    notAllowed={notAllowed}
    role={role}
  >
    {restaurants && (
      <Grid
        id={"restaurants"}
        aside={<RestaurantForm restaurant={restaurant} />}
        main={
          <CardsGrid
            heading={role === Role.Admin && <RestaurantsHeading />}
            cards={<Cards role={role} restaurants={restaurants} />}
          />
        }
      />
    )}
  </CmsNav>
)

RestaurantPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params, ctx }) => {
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
  if (role === Role.Waiter) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    return {
      redirect: {
        destination: `${Routes.OrdersPage().href}/${user.restaurantId}`,
        permanent: false,
      },
    }
  }

  // Manager of other company
  if (role === Role.Manager) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    if (user.restaurantId !== Number(params?.id)) {
      return {
        redirect: {
          destination: Routes.RestaurantPage({ id: user.restaurantId?.toString() ?? "" }).href,
          permanent: false,
        },
      }
    }
  }

  // Manger
  const restaurant = await getRestaurant(Number(params?.id))
  if (role === Role.Manager) return { props: { role, restaurant, restaurants: [] } }

  // Admin
  const restaurants = await getRestaurants()
  if (restaurant == null) return { notFound: true }
  return { props: { role, restaurants, restaurant } }
})

export default RestaurantPage
