import { resolver } from "@blitzjs/rpc"
import { array, boolean, number, object, string } from "zod"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export const UpdateOrder = object({
  id,
  notes: string().max(300),
  dishes: array(object({ id, count: number() })),
})

export default resolver.pipe(
  resolver.zod(UpdateOrder),
  resolver.authorize(["Admin", "Manager", "Waiter"]),
  async ({ id, notes, dishes }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const order = await db.order.findUniqueOrThrow({
      where: { id },
      select: {
        restaurantId: true,
        dishes: { select: { id: true } },
      },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== order.restaurantId)
      throw new Error("User is not allowed to update orders for this restaurant")

    // Update order
    await db.$transaction([
      db.orderedDish.deleteMany({ where: { orderId: id } }),
      db.order.update({
        where: { id },
        data: {
          notes,
          dishes: { createMany: { data: dishes.map((v) => ({ dishId: v.id, count: v.count })) } },
        },
      }),
    ])
  }
)
