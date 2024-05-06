import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import { getWaiters, Waiter } from "../../../../db/waiters/waiters"
import {
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import { Grid } from "../../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { WaitersHeading } from "../../../../containers/cms/waiters/WaitersHeading"
import { WaiterCards } from "../../../../containers/cms/waiters/WaiterCards"
import { WaitersCardsGrid } from "../../../../components/cms/waiters/WaitersCardsGrid"
import WaitersPage from "../index"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { getTitRestaurantWaiters } from "../../../../messages/waiters"

const RestaurantWaitersPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
  waiters,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
  waiters?: Waiter[]
}) => (
  <CmsNav title={getTitRestaurantWaiters()} notAllowed={notAllowed} role={role}>
    <Grid
      id={"waiters"}
      main={
        <WaitersCardsGrid
          heading={<WaitersHeading restaurants={restaurants} />}
          cards={waiters && <WaiterCards waiters={waiters} />}
        />
      }
    />
  </CmsNav>
)

RestaurantWaitersPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params, ctx }) => {
  const role = getRole(ctx)
  const restaurantId = Number(params?.restaurantId)

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
      return { redirect: { destination: Routes.DishesPage().href, permanent: false } }

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

    if (user.restaurantId !== restaurantId) {
      return {
        redirect: {
          destination: `${Routes.WaitersPage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
    }
  }

  // Admin, Manager
  if (!(await restaurantExists(restaurantId))) return { notFound: true }
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const waiters = await getWaiters(restaurantId)
  return {
    props: { role, restaurants, waiters },
  }
})

export default RestaurantWaitersPage
