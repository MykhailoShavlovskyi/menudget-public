import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getRole, getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { getOrders, OrderPick } from "../../../db/orders/orders"
import getOrdersQuery from "../../../db/orders/queries/getOrders"
import {
  getRestaurantCurrency,
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../db/restaurants/restaurants"
import { OrderCards } from "../../../containers/cms/orders/OrderCards"
import React, { ReactNode, Suspense, useEffect, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import { useRestaurantId } from "../../../store/cms/cms"
import { CmsNav } from "../../../components/cms/layout/CmsNav"
import { DishSelectDish, getDishSelectDishes } from "../../../db/dishes/dishes"
import { getTitRestaurantOrders } from "../../../messages/orders"

const OrdersPoller = ({ onOrdersRetrieved }: { onOrdersRetrieved: (v: OrderPick[]) => void }) => {
  const restaurantId = useRestaurantId()
  const [orders] = useQuery(getOrdersQuery, restaurantId as number, { refetchInterval: 1000 })
  useEffect(() => {
    orders && onOrdersRetrieved(orders)
  }, [onOrdersRetrieved, orders])
  return null
}

const RestaurantOrdersPage: BlitzPage = ({
  notAllowed,
  role,
  currency,
  orders,
  dishes,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  currency?: string
  orders?: OrderPick[]
  dishes: DishSelectDish[]
  restaurants?: RestaurantIndex[]
}) => {
  const [stateOrders, setOrders] = useState(orders)
  useEffect(() => setOrders(orders), [orders])

  return (
    <>
      <Suspense>
        <OrdersPoller onOrdersRetrieved={setOrders} />
      </Suspense>

      <CmsNav id="orders" title={getTitRestaurantOrders()} notAllowed={notAllowed} role={role}>
        {stateOrders && (
          <OrderCards
            currency={currency}
            restaurants={restaurants}
            orders={stateOrders}
            dishes={dishes}
          />
        )}
      </CmsNav>
    </>
  )
}

RestaurantOrdersPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

  // Manager & Waiter of other company
  if (role === Role.Manager || role === Role.Waiter) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    if (user.restaurantId !== restaurantId) {
      return {
        redirect: {
          destination: `${Routes.OrdersPage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
    }
  }

  // Admin, Manager, Waiter
  if (!(await restaurantExists(restaurantId))) return { notFound: true }
  const currency = await getRestaurantCurrency(restaurantId)
  const orders = await getOrders(restaurantId)
  const dishes = await getDishSelectDishes(restaurantId)
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  return { props: { role, currency, orders, dishes, restaurants } }
})

export default RestaurantOrdersPage
