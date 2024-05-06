import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { TablesHeading as Heading } from "../../../components/cms/tables/TablesHeading"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const TablesHeading = ({ restaurants }: { restaurants?: RestaurantIndex[] }) => {
  const restaurantId = useRestaurantId()
  const router = useRouter()

  const handleRestaurantSelect = (v: number) => router.push(`${Routes.TablesPage().pathname}/${v}`)

  return (
    <Heading
      restaurantId={restaurantId}
      restaurants={restaurants}
      onSelectRestaurant={handleRestaurantSelect}
    />
  )
}
