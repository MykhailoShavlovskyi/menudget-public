import { DishesHeading as Heading } from "../../../components/cms/dishes/DishesHeading"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const DishesHeading = ({ restaurants }: { restaurants?: RestaurantIndex[] }) => {
  const router = useRouter()
  const handleRestaurantSelect = (v: number) => router.push(`${Routes.DishesPage().href}/${v}`)

  return (
    <Heading
      restaurantId={useRestaurantId()}
      restaurants={restaurants}
      onSelectRestaurant={handleRestaurantSelect}
    />
  )
}
