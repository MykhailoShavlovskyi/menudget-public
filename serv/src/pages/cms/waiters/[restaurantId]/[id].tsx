import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import { getTables, TablePick } from "../../../../db/tables/tables"
import {
  getWaiters,
  getWaiterWithTables,
  Waiter,
  waiterExists,
  WaiterWithTables,
} from "../../../../db/waiters/waiters"
import {
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import { Grid } from "../../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { WaitersHeading } from "../../../../containers/cms/waiters/WaitersHeading"
import { WaiterCards } from "../../../../containers/cms/waiters/WaiterCards"
import { WaiterForm } from "../../../../containers/cms/waiters/WaiterForm"
import { WaitersCardsGrid } from "../../../../components/cms/waiters/WaitersCardsGrid"
import WaitersPage from "../index"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { getTitWaiter } from "../../../../messages/waiters"

const WaiterPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
  waiters,
  waiter,
  tables,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
  waiters?: Waiter[]
  waiter?: WaiterWithTables
  tables?: TablePick[]
}) => (
  <CmsNav
    title={waiter?.name ? waiter?.name + " - Menudget" : getTitWaiter()}
    role={role}
    notAllowed={notAllowed}
  >
    <Grid
      id={"waiters"}
      main={
        <WaitersCardsGrid
          heading={<WaitersHeading restaurants={restaurants} />}
          cards={waiters && <WaiterCards waiters={waiters} />}
        />
      }
      aside={tables && <WaiterForm waiter={waiter} tables={tables} />}
    />
  </CmsNav>
)

WaiterPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params, ctx }) => {
  const role = getRole(ctx)
  const restaurantId = Number(params?.restaurantId)
  const id = Number(params?.id)

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
  if (!(await waiterExists(restaurantId, id))) return { notFound: true }
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const waiters = await getWaiters(restaurantId)
  const waiter = await getWaiterWithTables(id)
  const tables = await getTables(restaurantId)
  return {
    props: { role, restaurants, waiters, waiter, tables },
  }
})

export default WaiterPage
