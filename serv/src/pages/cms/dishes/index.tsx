import { BlitzPage, Routes } from "@blitzjs/next"
import { Role } from "../../../definitions/Role"
import CmsLayout from "src/components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Grid } from "../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { getRestaurantIndex, RestaurantIndex } from "../../../db/restaurants/restaurants"
import { DishesHeading } from "../../../containers/cms/dishes/DishesHeading"
import { DishesCardsGrid } from "../../../components/cms/dishes/DishesCardsGrid"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitDishes } from "../../../messages/dishes"

const DishesPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
}) => (
  <CmsNav title={getTitDishes()} notAllowed={notAllowed} role={role}>
    <Grid
      id={"dishes"}
      main={<DishesCardsGrid heading={<DishesHeading restaurants={restaurants} />} />}
    />
  </CmsNav>
)

DishesPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

export default DishesPage
