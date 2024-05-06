import { resolver } from "@blitzjs/rpc"
import { object } from "zod"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export const UpdateDishCategory = object({
  id,
  categoryId: id,
})

export default resolver.pipe(
  resolver.zod(UpdateDishCategory),
  resolver.authorize(["Admin", "Manager"]),
  async ({ id, categoryId }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const dish = await db.dish.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    const category = await db.category.findUniqueOrThrow({
      where: { id: categoryId },
      select: { restaurantId: true },
    })
    if (
      user?.role !== Role.Admin &&
      (user?.restaurantId !== dish.restaurantId || user?.restaurantId !== category.restaurantId)
    )
      throw new Error("User is not allowed to update dishes for this restaurant")

    // Get data
    const dishes = await db.dish.findMany({ where: { categoryId }, select: { order: true } })
    const maxOrder = Math.max(-1, ...dishes.map((v) => v.order))

    // Update dish category
    return db.dish.update({ where: { id }, data: { categoryId, order: maxOrder + 1 } })
  }
)
