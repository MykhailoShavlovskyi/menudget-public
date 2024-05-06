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
    const { restaurantId } = await db.category.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to update categories for this restaurant")

    // Get data
    const categories = await db.category.findMany({
      where: { restaurantId },
      select: { id: true, order: true },
    })
    categories.sort((a, b) => a.order - b.order)
    const currentCatIndex = categories.findIndex((v) => v.id === id)
    const currentCat = categories[currentCatIndex]
    const previousCat = categories[currentCatIndex - 1]
    if (currentCat == null) throw new Error("Cannot find target category")

    // Mutate
    if (previousCat == null) return true
    return db.$transaction([
      // Negate all orders
      ...categories.map((v) =>
        db.category.update({ where: { id: v.id }, data: { order: v.order - 999999999 } })
      ),

      // Swap orders with next category
      db.category.update({ where: { id }, data: { order: previousCat.order } }),
      db.category.update({ where: { id: previousCat.id }, data: { order: currentCat.order } }),

      // Negate orders of remaining categories
      ...categories
        .filter((v) => v.id !== id && v.id !== previousCat.id)
        .map((v) => db.category.update({ where: { id: v.id }, data: { order: v.order } })),
    ])
  }
)
