import { resolver } from "@blitzjs/rpc"
import db from "../../../../db/db"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager"]),
  async (id, ctx) => {
    const user = await getUser(ctx)
    const promo = await db.promo.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })

    // Validate restaurantId
    if (user?.role !== Role.Admin && user?.restaurantId !== promo.restaurantId)
      throw new Error("User is not allowed to delete promos for this restaurant")

    // Delete
    return db.promo.delete({ where: { id } })
  }
)
