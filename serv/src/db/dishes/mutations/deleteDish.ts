import { resolver } from "@blitzjs/rpc"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

export default resolver.pipe(
  resolver.zod(id),
  resolver.authorize(["Admin", "Manager"]),
  async (id, ctx) => {
    const user = await getUser(ctx)
    const dish = await db.dish.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true, _count: { select: { ordered: true } } },
    })

    // Validate restaurantId
    if (user?.role !== Role.Admin && user?.restaurantId !== dish.restaurantId)
      throw new Error("User is not allowed to delete dishes for this restaurant")

    // Delete
    if (dish._count.ordered === 0) return db.dish.delete({ where: { id } })
    else return db.dish.update({ where: { id }, data: { deleted: true } })

    // TODO delete images
  }
)
