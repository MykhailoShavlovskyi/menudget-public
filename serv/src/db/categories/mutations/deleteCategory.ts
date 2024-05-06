import { resolver } from "@blitzjs/rpc"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { difference, uniq } from "@chevrotain/utils"
import { Role } from "../../../definitions/Role"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager"]),
  async (id, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const { restaurantId } = await db.category.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to delete categories for this restaurant")

    // Get data
    const dishes = await db.dish.findMany({ where: { categoryId: id }, select: { id: true } })
    const dishIds = dishes.map((v) => v.id)
    const ordered = await db.orderedDish.findMany({
      where: { dish: { categoryId: id } },
      select: { dishId: true },
    })
    const orderedDishIds = uniq(ordered.map((v) => v.dishId))
    const notOrderedDishIds = difference(dishIds, orderedDishIds)

    // Mutate
    if (orderedDishIds.length === 0) {
      return db.category.delete({ where: { id } })
    } else {
      return db.$transaction([
        db.dish.deleteMany({ where: { id: { in: notOrderedDishIds } } }),
        db.dish.updateMany({ where: { id: { in: orderedDishIds } }, data: { deleted: true } }),
        db.category.update({ where: { id }, data: { deleted: true } }),
      ])
    }

    // TODO delete images
  }
)
