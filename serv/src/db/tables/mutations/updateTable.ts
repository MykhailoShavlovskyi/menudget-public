import { resolver } from "@blitzjs/rpc"
import { array, object, string, z } from "zod"
import db from "../../../../db/db"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

const UpdateTable = object({
  id,
  name: string(),
  occupancy: z.enum(["1-2", "3-6", "6-8", "8+"]),
  waiterIds: array(id),
})

export default resolver.pipe(
  resolver.zod(UpdateTable),
  resolver.authorize(["Admin", "Manager"]),
  async ({ id, waiterIds, ...data }, ctx) => {
    // Get table
    const table = await db.table.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true, waiters: { select: { id: true } } },
    })

    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== table.restaurantId)
      throw new Error("User is not allowed to update tables for this restaurant")

    // Update table
    return db.table.update({
      where: { id },
      data: {
        ...data,
        waiters: {
          disconnect: table.waiters.map(({ id }) => ({ id })),
          connect: waiterIds.map((id) => ({ id })),
        },
      },
    })
  }
)
