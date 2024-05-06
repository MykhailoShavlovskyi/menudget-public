import { resolver } from "@blitzjs/rpc"
import db from "../../../../db/db"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager"]),
  async (id, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const waiter = await db.user.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== waiter.restaurantId)
      throw new Error("User is not allowed to delete waiters for this restaurant")

    // Mark as deleted
    return db.user.update({ where: { id }, data: { deleted: true } })
  }
)
