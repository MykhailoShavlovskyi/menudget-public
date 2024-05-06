import { resolver } from "@blitzjs/rpc"
import * as zod from "zod"
import { object } from "zod"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { OrderState } from "../../../definitions/OrderState"

export const SetOrderState = object({
  id,
  state: zod.enum([
    OrderState.InProgress,
    OrderState.Pending,
    OrderState.Done,
    OrderState.Archived,
  ]),
})

export default resolver.pipe(
  resolver.zod(SetOrderState),
  resolver.authorize(["Admin", "Manager", "Waiter"]),
  async ({ id, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const order = await db.order.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== order.restaurantId)
      throw new Error("User is not allowed to update orders for this restaurant")

    // Update order
    return db.order.update({ where: { id }, data })
  }
)