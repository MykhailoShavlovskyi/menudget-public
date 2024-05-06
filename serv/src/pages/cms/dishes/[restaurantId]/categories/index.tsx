import { BlitzPage, Routes } from "@blitzjs/next"
import {
  getRestaurantCurrency,
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../../db/restaurants/restaurants"
import { DishPick, getDishes } from "../../../../../db/dishes/dishes"
import { Grid } from "../../../../../components/cms/common/Grid"
import { DishesHeading } from "../../../../../containers/cms/dishes/DishesHeading"
import { DishCards } from "../../../../../containers/cms/dishes/DishCards"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../../blitz-server"
import { getRole, getUser } from "../../../../../lib/context"
import { Role } from "../../../../../definitions/Role"
import React, { ReactNode } from "react"
import { CategoryPick, getCategories } from "../../../../../db/categories/categories"
import { CategoriesBar } from "../../../../../containers/cms/dishes/CategoriesBar"
import { DishesLayout } from "../../../../../components/cms/layout/DishesLayout"
import { useRestaurantId } from "../../../../../store/cms/cms"
import { DishesCardsGrid } from "../../../../../components/cms/dishes/DishesCardsGrid"
import { CategoriesForm } from "../../../../../containers/cms/dishes/CategoriesForm"
import { CmsNav } from "../../../../../components/cms/layout/CmsNav"
import { getTitCategories } from "../../../../../messages/dishes"

const CategoriesPage: BlitzPage = ({
  role,
  restaurants,
  categories,
  dishes,
  currency,
}: {
  role?: string
  restaurants?: RestaurantIndex[]
  categories?: CategoryPick[]
  dishes?: DishPick[]
  currency?: string
}) => {
  const restaurantId = useRestaurantId()

  return (
    <CmsNav title={getTitCategories()} role={role}>
      <Grid
        id={"dishes"}
        main={
          <DishesCardsGrid
            heading={
              <>
                <DishesHeading restaurants={restaurants} />
                {categories && (
                  <CategoriesBar restaurantId={restaurantId} categories={categories} />
                )}
              </>
            }
            cards={dishes && currency && <DishCards dishes={dishes} currency={currency} />}
          />
        }
        aside={categories && <CategoriesForm categories={categories} />}
      />
    </CmsNav>
  )
}

CategoriesPage.getLayout = (page: ReactNode) => <DishesLayout>{page}</DishesLayout>

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

  if (role === Role.Manager || role === Role.Waiter) {
    const user = await getUser(ctx)
    if (user == null)
      return { redirect: { destination: Routes.LoginPage().href, permanent: false } }

    // Manager of other company
    if (role === Role.Manager && user.restaurantId !== restaurantId) {
      return {
        redirect: {
          destination: `${Routes.DishesPage().href}/${user.restaurantId}`,
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
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const categories = await getCategories(restaurantId)
  const dishes = await getDishes(restaurantId)
  const currency = await getRestaurantCurrency(restaurantId)
  return {
    props: { role, restaurants, categories, dishes, currency },
  }
})

export default CategoriesPage
