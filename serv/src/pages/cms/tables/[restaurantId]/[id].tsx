import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import {
  getTables,
  getTableWithWaiters,
  tableExists,
  TablePick,
  TableWithWaiters,
} from "../../../../db/tables/tables"
import { Grid } from "../../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import {
  getRestaurantIndex,
  getRestaurantName,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import { TablesHeading } from "../../../../containers/cms/tables/TablesHeading"
import { TableCards } from "../../../../containers/cms/tables/TableCards"
import { TableForm } from "../../../../containers/cms/tables/TableForm"
import { TablesCardsGrid } from "../../../../components/cms/tables/TablesCardsGrid"
import { getWaiterIndex, WaiterIndex } from "../../../../db/waiters/waiters"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { getTitTable } from "../../../../messages/tables"

const TablePage: BlitzPage = ({
  notAllowed,
  role,
  restaurantName,
  restaurants,
  tables,
  table,
  waiters,
}: {
  notAllowed?: boolean
  role?: string
  restaurantName?: string
  restaurants?: RestaurantIndex[]
  tables?: TablePick[]
  table?: TableWithWaiters
  waiters?: WaiterIndex[]
}) => (
  <CmsNav
    title={table ? table.name + " - Menudget" : getTitTable()}
    notAllowed={notAllowed}
    role={role}
  >
    <Grid
      id={"tables"}
      main={
        <TablesCardsGrid
          heading={<TablesHeading restaurants={restaurants} />}
          cards={tables && <TableCards tables={tables} restaurantName={restaurantName} />}
        />
      }
      aside={waiters && <TableForm table={table} waiters={waiters} />}
    />
  </CmsNav>
)

TablePage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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

  if (role === Role.Manager || role === Role.Waiter) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    // Manager of other company
    if (role === Role.Manager && user.restaurantId !== restaurantId) {
      return {
        redirect: {
          destination: `${Routes.TablesPage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
    }

    // Waiter
    else if (role === Role.Waiter)
      return {
        redirect: {
          destination: `${Routes.OrdersPage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
  }

  // Admin, Manager
  if (!(await restaurantExists(restaurantId))) return { notFound: true }
  if (!(await tableExists(restaurantId, id))) return { notFound: true }
  const restaurantName = await getRestaurantName(restaurantId)
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const tables = await getTables(restaurantId)
  const table = await getTableWithWaiters(id)
  const waiters = await getWaiterIndex(restaurantId)
  return {
    props: { role, restaurantName, restaurants, tables, table, waiters },
  }
})

export default TablePage
