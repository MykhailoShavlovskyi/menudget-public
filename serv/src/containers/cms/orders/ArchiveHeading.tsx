import { ArchiveHeading as Heading } from "../../../components/cms/orders/ArchiveHeading"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useRestaurantId } from "../../../store/cms/cms"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"

export const ArchiveHeading = ({ restaurants }: { restaurants?: RestaurantIndex[] }) => {
  const router = useRouter()
  const restaurantId = useRestaurantId()

  const handleGoBack = () =>
    router.push(
      restaurantId != null
        ? `${Routes.OrdersPage().href}/${restaurantId}`
        : Routes.OrdersPage().href
    )
  const handleRestaurantSelect = (v: number) => router.push(`${Routes.ArchivePage().href}/${v}`)

  return (
    <Heading
      restaurantId={useRestaurantId()}
      restaurants={restaurants}
      onGoBack={handleGoBack}
      onSelectRestaurant={handleRestaurantSelect}
    />
  )
}
