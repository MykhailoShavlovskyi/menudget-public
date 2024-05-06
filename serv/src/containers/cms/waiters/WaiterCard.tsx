import { WaiterCard as Card } from "../../../components/cms/waiters/WaiterCard"
import { Waiter } from "../../../db/waiters/waiters"
import { useId, useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const WaiterCard = ({ id, name, email }: Waiter) => {
  const router = useRouter()
  const restaurantId = useRestaurantId()
  const handleClick = () => router.push(`${Routes.WaitersPage().href}/${restaurantId}/${id}`)

  return (
    <Card
      id={email}
      selected={id === useId()}
      name={name}
      email={email}
      tableNames={["1", "2", "16", "23"]}
      onClick={handleClick}
    />
  )
}
