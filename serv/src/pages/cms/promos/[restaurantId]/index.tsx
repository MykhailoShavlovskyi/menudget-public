import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import {
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import { Grid } from "../../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { PromosHeading } from "../../../../containers/cms/promos/PromosHeading"
import { PromosCardsGrid } from "../../../../components/cms/promos/PromosCardsGrid"
import { Promo } from "@prisma/client"
import { getPromos } from "../../../../db/promos/promos"
import { PromoCards } from "../../../../containers/cms/promos/PromoCards"

const RestaurantPromosPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
  promos,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
  promos?: Promo[]
}) => (
  <CmsNav title="Promos - Menudget" notAllowed={notAllowed} role={role}>
    <Grid
      id={"promos"}
      main={
        <PromosCardsGrid
          heading={<PromosHeading restaurants={restaurants} />}
          cards={promos && <PromoCards promos={promos} />}
        />
      }
    />
  </CmsNav>
)

RestaurantPromosPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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
          destination: `${Routes.PromosPage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
    }
  }

  // Admin, Manager
  if (!(await restaurantExists(restaurantId))) return { notFound: true }
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const promos = await getPromos(restaurantId)
  return {
    props: { role, restaurants, promos },
  }
})

export default RestaurantPromosPage
