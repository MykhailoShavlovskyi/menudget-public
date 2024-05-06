import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/db/auth/queries/getCurrentUser"
import { useSession } from "@blitzjs/auth"

export const useUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}

export function useUserRole() {
  return useSession().role
}

export function useUserRestaurantId() {
  return useUser()?.restaurantId
}
