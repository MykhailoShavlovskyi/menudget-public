import { PromoCard } from "./PromoCard"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { Promo } from "@prisma/client"
import { AddPromoCard } from "../../../components/cms/promos/AddPromoCard"

export const PromoCards = ({ promos }: { promos: Promo[] }) => {
  const restaurantId = useRestaurantId()
  const router = useRouter()
  const handleCreatePromo = () => router.push(`${Routes.PromosPage().pathname}/${restaurantId}/new`)

  return (
    <>
      <AddPromoCard onClick={handleCreatePromo} />
      {promos.map((v) => (
        <PromoCard key={v.id} {...v} />
      ))}
    </>
  )
}
