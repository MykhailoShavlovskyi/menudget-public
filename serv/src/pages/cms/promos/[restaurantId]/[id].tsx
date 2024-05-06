import { BlitzPage, Routes } from "@blitzjs/next"
import CmsLayout from "../../../../components/cms/layout/CmsLayout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import {
  getPromos,
  getResolvedPromo,
  promoExists,
  ResolvedPromo,
} from "../../../../db/promos/promos"
import {
  getRestaurantCurrency,
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import { Grid } from "../../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import { PromosHeading } from "../../../../containers/cms/promos/PromosHeading"
import { PromoCards } from "../../../../containers/cms/promos/PromoCards"
import { PromosCardsGrid } from "../../../../components/cms/promos/PromosCardsGrid"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { Promo } from "@prisma/client"
import { PromoForm } from "../../../../containers/cms/promos/PromoForm"
import { DishIndex, getDishIndex } from "../../../../db/dishes/dishes"

const PromoPage: BlitzPage = ({
  notAllowed,
  role,
  restaurants,
  promos,
  promo,
  currency,
  dishes,
}: {
  notAllowed?: boolean
  role?: string
  restaurants?: RestaurantIndex[]
  promos?: Promo[]
  promo?: ResolvedPromo
  currency?: string
  dishes?: DishIndex[]
}) => (
  <CmsNav
    title={promo?.name ? promo?.name + " - Menudget" : "Promos - Menudget"}
    role={role}
    notAllowed={notAllowed}
  >
    <Grid
      id={"promos"}
      main={
        <PromosCardsGrid
          heading={<PromosHeading restaurants={restaurants} />}
          cards={promos && <PromoCards promos={promos} />}
        />
      }
      aside={currency && dishes && <PromoForm promo={promo} currency={currency} dishes={dishes} />}
    />
  </CmsNav>
)

PromoPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

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
          destination: `${Routes.PromosPage().href}/${user.restaurantId}`,
          permanent: false,
        },
      }
    }
  }

  // Admin, Manager
  if (!(await restaurantExists(restaurantId))) return { notFound: true }
  if (!(await promoExists(restaurantId, id))) return { notFound: true }
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const promos = await getPromos(restaurantId)
  const promo = await getResolvedPromo(id)
  const currency = await getRestaurantCurrency(restaurantId)
  const dishes = await getDishIndex(restaurantId)
  return {
    props: { role, restaurants, promos, promo, currency, dishes },
  }
})

export default PromoPage
