import { resolver } from "@blitzjs/rpc"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { OrderState } from "../../../definitions/OrderState"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager", "Waiter"]),
  async (id, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const order = await db.order.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== order.restaurantId)
      throw new Error("User is not allowed to delete orders for this restaurant")

    // Update order
    return db.order.update({ where: { id }, data: { state: OrderState.Deleted } })
  }
)
