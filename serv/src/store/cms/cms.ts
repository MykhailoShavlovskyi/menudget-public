import { useRouter } from "next/router"

export function useRestaurantId() {
  const value = useRouter().query.restaurantId
  return value != null ? Number(value) : undefined
}

export function useId() {
  const value = useRouter().query.id
  return value != null ? Number(value) : undefined
}
