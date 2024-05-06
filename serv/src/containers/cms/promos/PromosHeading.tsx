import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { PromosHeading as Heading } from "../../../components/cms/promos/PromosHeading"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const PromosHeading = ({ restaurants }: { restaurants?: RestaurantIndex[] }) => {
  const restaurantId = useRestaurantId()
  const router = useRouter()

  const handleRestaurantSelect = (v: number) => router.push(`${Routes.PromosPage().pathname}/${v}`)

  return (
    <Heading
      restaurantId={restaurantId}
      restaurants={restaurants}
      onSelectRestaurant={handleRestaurantSelect}
    />
  )
}
