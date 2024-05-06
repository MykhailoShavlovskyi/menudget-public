import { resolver } from "@blitzjs/rpc"
import { object, string } from "zod"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export const UpdateCategory = object({
  id,
  name: string().min(3),
})

export default resolver.pipe(
  resolver.zod(UpdateCategory),
  resolver.authorize(["Admin", "Manager"]),
  async ({ id, name }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const { restaurantId } = await db.category.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to update categories for this restaurant")

    // Update category
    return db.category.update({ where: { id }, data: { name } })
  }
)
