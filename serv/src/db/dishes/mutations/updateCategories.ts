import { resolver } from "@blitzjs/rpc"
import { guid, id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { array, object, string } from "zod"
import db from "../../../../db/db"
import { differenceBy, intersectionBy } from "lodash"

export const UpdateCategories = object({
  restaurantId: id,
  categories: array(
    object({
      id: id.or(guid),
      name: string().max(50),
    })
  ),
})

export default resolver.pipe(
  resolver.zod(UpdateCategories),
  resolver.authorize(["Admin", "Manager"]),
  async ({ restaurantId, categories }, ctx) => {
    // Authorize user
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to update categories for this restaurant")

    // Get current categories
    const allCategories = await db.category.findMany({
      where: { restaurantId },
      select: { id: true, name: true, deleted: true },
    })

    // Filter categories
    const createdCategories = differenceBy(categories, allCategories, (v) => v.name)
    const updatedCategories = intersectionBy(categories, allCategories, (v) => v.name)
    const deletedCategories = differenceBy(allCategories, categories, (v) => v.name)
    updatedCategories.forEach((v) => {
      const c = allCategories.find((c) => c.name === v.name)
      if (c) v.id = c.id
    })

    await db.$transaction([
      // Create
      ...createdCategories.map((v) =>
        db.category.create({
          data: { restaurantId, order: categories.findIndex((c) => c.id === v.id), name: v.name },
        })
      ),

      // Update
      ...updatedCategories.map((v, i) =>
        db.category.update({
          where: { id: v.id as number },
          data: { order: i + 99999999 },
        })
      ),
      ...updatedCategories.map((v) =>
        db.category.update({
          where: { id: v.id as number },
          data: {
            restaurantId,
            order: categories.findIndex((c) => c.id === v.id),
            name: v.name,
            deleted: false,
          },
        })
      ),

      // Delete
      db.category.updateMany({
        where: { id: { in: deletedCategories.map((v) => v.id) } },
        data: { deleted: true },
      }),
    ])
  }
)
