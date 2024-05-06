import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "src/components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { getRestaurantIndex, RestaurantIndex } from "../../../db/restaurants/restaurants"
import { OrderCards } from "../../../containers/cms/orders/OrderCards"
import React, { ReactNode } from "react"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { getTitOrders } from "../../../messages/orders"

const OrdersPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
}) => (
  <CmsNav id={"orders"} title={getTitOrders()} notAllowed={notAllowed} role={role}>
    <OrderCards restaurants={restaurants} orders={[]} dishes={[]} />
  </CmsNav>
)

OrdersPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

  // Manager & Waiter
  if (role === Role.Manager || role === Role.Waiter) {
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

  // Admin
  const restaurants = await getRestaurantIndex()
  return { props: { role, restaurants } }
})

export default OrdersPage
