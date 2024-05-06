import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "src/components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { Grid } from "../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { getRestaurantIndex, RestaurantIndex } from "../../../db/restaurants/restaurants"
import { TablesHeading } from "../../../containers/cms/tables/TablesHeading"
import { CardsGrid } from "../../../components/cms/cards-grid/CardsGrid"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitTables } from "../../../messages/tables"

const TablesPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
}) => (
  <CmsNav title={getTitTables()} notAllowed={notAllowed} role={role}>
    <Grid
      id={"tables"}
      main={<CardsGrid heading={<TablesHeading restaurants={restaurants} />} />}
    />
  </CmsNav>
)

TablesPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

  // Manager, Waiter
  if (role === Role.Manager || role === Role.Waiter) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    const base = role === Role.Manager ? Routes.DishesPage().href : Routes.OrdersPage().href
    return {
      redirect: {
        destination: `${base}/${user.restaurantId}`,
        permanent: false,
      },
    }
  }

  // Admin
  const restaurants = await getRestaurantIndex()
  return { props: { role, restaurants } }
})

export default TablesPage
