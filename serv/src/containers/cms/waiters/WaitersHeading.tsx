import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { WaitersHeading as Heading } from "../../../components/cms/waiters/WaitersHeading"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const WaitersHeading = ({ restaurants }: { restaurants?: RestaurantIndex[] }) => {
  const restaurantId = useRestaurantId()
  const router = useRouter()

  const handleRestaurantSelect = (v: number) => router.push(`${Routes.WaitersPage().pathname}/${v}`)

  return (
    <Heading
      restaurantId={restaurantId}
      restaurants={restaurants}
      onSelectRestaurant={handleRestaurantSelect}
    />
  )
}
