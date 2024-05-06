import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "src/components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { Grid } from "../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { getRestaurantIndex, RestaurantIndex } from "../../../db/restaurants/restaurants"
import { WaitersHeading } from "../../../containers/cms/waiters/WaitersHeading"
import { WaitersCardsGrid } from "../../../components/cms/waiters/WaitersCardsGrid"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitWaiters } from "../../../messages/waiters"

const WaitersPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
}) => (
  <CmsNav title={getTitWaiters()} notAllowed={notAllowed} role={role}>
    <Grid
      id={"waiters"}
      main={<WaitersCardsGrid heading={<WaitersHeading restaurants={restaurants} />} />}
    />
  </CmsNav>
)

WaitersPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

  // Manager
  if (role === Role.Manager) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    return {
      redirect: {
        destination: `${Routes.WaitersPage().href}/${user.restaurantId}`,
        permanent: false,
      },
    }
  }

  // Admin
  const restaurants = await getRestaurantIndex()
  return { props: { role, restaurants } }
})

export default WaitersPage
