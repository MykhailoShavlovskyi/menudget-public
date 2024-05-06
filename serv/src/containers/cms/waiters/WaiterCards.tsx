import { Waiter } from "../../../db/waiters/waiters"
import { WaiterCard } from "./WaiterCard"
import { AddWaiterCard } from "../../../components/cms/waiters/AddWaiterCard"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const WaiterCards = ({ waiters }: { waiters: Waiter[] }) => {
  const restaurantId = useRestaurantId()
  const router = useRouter()
  const handleCreateWaiter = () =>
    router.push(`${Routes.WaitersPage().pathname}/${restaurantId}/new`)

  return (
    <>
      <AddWaiterCard onClick={handleCreateWaiter} />
      {waiters.map((v) => (
        <WaiterCard key={v.id} {...v} />
      ))}
    </>
  )
}
