import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import { ArchiveOrder, getArchiveOrders, OrderPick, takeOrders } from "../../../../db/orders/orders"
import {
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import React, { ReactNode, useState } from "react"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { ArchiveContainer } from "../../../../components/cms/orders/ArchiveContainer"
import { ArchiveHeading } from "../../../../containers/cms/orders/ArchiveHeading"
import { ArchiveTable, ArchiveTableItem } from "../../../../components/cms/orders/ArchiveTable"
import { Receipt } from "../../../../components/cms/orders/Receipt"
import { getTitArchiveOrders } from "../../../../messages/orders"

const OrdersPoller = ({ onOrdersRetrieved }: { onOrdersRetrieved: (v: OrderPick[]) => void }) => {
  /*const restaurantId = useRestaurantId()
  const [orders] = useQuery(getOrdersQuery, restaurantId as number, { refetchInterval: 1000 })
  useEffect(() => {
    orders && onOrdersRetrieved(orders)
  }, [onOrdersRetrieved, orders])
  return null*/
}

const RestaurantArchivePage: BlitzPage = ({
  notAllowed,
  role,
  page = 1,
  pageCount = 1,
  orders,
  restaurants,
}: {
  notAllowed?: boolean
  role?: string
  page?: number
  pageCount?: number
  orders?: ArchiveOrder[]
  restaurants?: RestaurantIndex[]
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  return (
    <>
      {/*<Suspense>
        <OrdersPoller onOrdersRetrieved={setOrders} />
      </Suspense>*/}

      <CmsNav id="orders" title={getTitArchiveOrders()} notAllowed={notAllowed} role={role}>
        {orders && (
          <ArchiveContainer
            heading={<ArchiveHeading restaurants={restaurants} />}
            table={
              <ArchiveTable
                items={orders.map((v) => (
                  <ArchiveTableItem {...v} key={v.id} onClick={() => setSelectedOrderId(v.id)} />
                ))}
                page={page}
                canGoPrev={page > 1}
                canGoNext={page <= pageCount}
                onPageChange={() => setSelectedOrderId(null)}
              />
            }
            receipt={
              selectedOrderId != null && (
                <Receipt
                  order={orders.find((v) => v.id === selectedOrderId)}
                  onClose={() => setSelectedOrderId(null)}
                />
              )
            }
          />
        )}
      </CmsNav>
    </>
  )
}

RestaurantArchivePage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const role = getRole(ctx)
  const restaurantId = Number(params?.restaurantId)
  const page = query.page ? Number(query.page) : 1
  const search = (query.search ?? "") as string

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
          destination: `${Routes.ArchivePage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
    }
  }

  // Admin, Manager, Waiter
  if (!(await restaurantExists(restaurantId))) return { notFound: true }
  const { orders, count } = await getArchiveOrders(restaurantId, page ?? 1, search)
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  return { props: { role, page, pageCount: count / takeOrders, orders, restaurants } }
})

export default RestaurantArchivePage
