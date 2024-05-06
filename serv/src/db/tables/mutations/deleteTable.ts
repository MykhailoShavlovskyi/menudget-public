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
    const table = await db.table.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true, _count: { select: { orders: true } } },
    })

    // Validate restaurantId
    if (user?.role !== Role.Admin && user?.restaurantId !== table.restaurantId)
      throw new Error("User is not allowed to delete tables for this restaurant")

    // Delete
    if (table._count.orders === 0) return db.table.delete({ where: { id } })
    else return db.table.update({ where: { id }, data: { deleted: true } })
  }
)
