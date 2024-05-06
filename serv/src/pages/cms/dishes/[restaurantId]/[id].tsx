import { BlitzPage, Routes } from "@blitzjs/next"
import {
  dishExists,
  DishPick,
  getDish,
  getDishes,
  getDishName,
  ResolvedDish,
} from "../../../../db/dishes/dishes"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../../blitz-server"
import { getRole, getUser } from "../../../../lib/context"
import { Role } from "../../../../definitions/Role"
import { Grid } from "../../../../components/cms/common/Grid"
import React, { ReactNode } from "react"
import {
  getRestaurantCurrency,
  getRestaurantIndex,
  restaurantExists,
  RestaurantIndex,
} from "../../../../db/restaurants/restaurants"
import { DishesHeading } from "../../../../containers/cms/dishes/DishesHeading"
import { DishCards } from "../../../../containers/cms/dishes/DishCards"
import { DishForm } from "../../../../containers/cms/dishes/DishForm"
import { CategoryPick, getCategories } from "../../../../db/categories/categories"
import { CategoriesBar } from "../../../../containers/cms/dishes/CategoriesBar"
import { DishesLayout } from "../../../../components/cms/layout/DishesLayout"
import { useRestaurantId } from "../../../../store/cms/cms"
import { DishesCardsGrid } from "../../../../components/cms/dishes/DishesCardsGrid"
import { CmsNav } from "../../../../components/cms/layout/CmsNav"
import { getTitIdDishes } from "../../../../messages/dishes"

const DishPage: BlitzPage = ({
  notAllowed,
  role,
  dishName,
  restaurants,
  categories,
  dishes,
  currency,
  dish,
}: {
  notAllowed?: boolean
  role?: string
  dishName?: string
  restaurants?: RestaurantIndex[]
  categories?: CategoryPick[]
  dishes?: DishPick[]
  currency?: string
  dish?: ResolvedDish
}) => {
  const restaurantId = useRestaurantId()

  return (
    <CmsNav
      title={dishName ? dishName + " - Menudget" : getTitIdDishes()}
      notAllowed={notAllowed}
      role={role}
    >
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
        aside={categories && <DishForm dish={dish} categories={categories} />}
      />
    </CmsNav>
  )
}

DishPage.getLayout = (page: ReactNode) => <DishesLayout>{page}</DishesLayout>

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
  if (!(await dishExists(restaurantId, id))) return { notFound: true }
  const restaurants = role === Role.Admin ? await getRestaurantIndex() : undefined
  const categories = await getCategories(restaurantId)
  const dishes = await getDishes(restaurantId)
  const currency = await getRestaurantCurrency(restaurantId)
  const dish = await getDish(id)
  const dishName = await getDishName(id)
  return {
    props: { role, restaurants, categories, dishes, currency, dish, dishName },
  }
})

export default DishPage
