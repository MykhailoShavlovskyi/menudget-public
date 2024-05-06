import { resolver } from "@blitzjs/rpc"
import { object, string } from "zod"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export const CreateCategory = object({
  restaurantId: id,
  name: string().min(3).optional(),
})

export default resolver.pipe(
  resolver.zod(CreateCategory),
  resolver.authorize(["Admin", "Manager"]),
  async ({ restaurantId, name }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to create categories for this restaurant")

    // Create category
    const categories = await db.category.findMany({
      where: { restaurantId },
      select: { order: true },
    })
    const maxOrder = Math.max(-1, ...categories.map((v) => v.order))
    return db.category.create({ data: { restaurantId, name, order: maxOrder + 1 } })
  }
)
