import { resolver } from "@blitzjs/rpc"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { getOrders } from "../orders"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager", "Waiter"]),
  async (id, ctx) => {
    if (ctx?.session == null) return null

    // Validate user restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== id)
      throw new Error("User is not allowed to get orders for this restaurant")

    // Get orders
    return getOrders(id)
  }
)
