import { resolver } from "@blitzjs/rpc"
import { object, string } from "zod"
import { CreateDish } from "./createDish"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export const UpdateDish = CreateDish.omit({ restaurantId: true }).merge(
  object({
    id,
    modelKey: string().optional().nullable(),
  })
)

export default resolver.pipe(
  resolver.zod(UpdateDish),
  resolver.authorize(["Admin", "Manager"]),
  async ({ id, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const dish = await db.dish.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== dish.restaurantId)
      throw new Error("User is not allowed to update dishes for this restaurant")

    // Update dish
    return db.dish.update({ where: { id }, data })
  }
)
