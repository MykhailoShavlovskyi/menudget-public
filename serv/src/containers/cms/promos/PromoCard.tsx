import { PromoCard as Card } from "../../../components/cms/promos/PromoCard"
import { useId, useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { Promo } from "@prisma/client"

export const PromoCard = ({ id, name }: Promo) => {
  const router = useRouter()
  const restaurantId = useRestaurantId()
  const handleClick = () => router.push(`${Routes.PromosPage().href}/${restaurantId}/${id}`)

  return <Card name={name} selected={id === useId()} onClick={handleClick} />
}
