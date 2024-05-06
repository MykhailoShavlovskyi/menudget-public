import { resolver } from "@blitzjs/rpc"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager"]),
  async (id, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const { restaurantId, categoryId } = await db.dish.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true, categoryId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to edit dish for this restaurant")

    // Get data
    const dishes = await db.dish.findMany({
      where: { categoryId },
      select: { id: true, order: true },
    })
    dishes.sort((a, b) => a.order - b.order)
    const currentDishIndex = dishes.findIndex((v) => v.id === id)
    const currentDish = dishes[currentDishIndex]
    const nextDish = dishes[currentDishIndex + 1]
    if (currentDish == null) throw new Error("Cannot find current dish")

    // Mutate
    if (nextDish == null) return true
    return db.$transaction([
      // Negate all orders
      ...dishes.map((v) =>
        db.dish.update({ where: { id: v.id }, data: { order: v.order - 999999999 } })
      ),

      // Swap orders with next category
      db.dish.update({ where: { id }, data: { order: nextDish.order } }),
      db.dish.update({ where: { id: nextDish.id }, data: { order: currentDish.order } }),

      // Restore orders of remaining dishes
      ...dishes
        .filter((v) => v.id !== id && v.id !== nextDish.id)
        .map((v) => db.dish.update({ where: { id: v.id }, data: { order: v.order } })),
    ])
  }
)
