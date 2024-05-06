import { resolver } from "@blitzjs/rpc"
import { array, object, string, z } from "zod"
import db from "../../../../db/db"
import { Role } from "../../../definitions/Role"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"

const CreateTable = object({
  restaurantId: id,
  name: string(),
  occupancy: z.enum(["1-2", "3-6", "6-8", "8+"]),
  waiterIds: array(id),
})

export default resolver.pipe(
  resolver.zod(CreateTable),
  resolver.authorize(["Admin", "Manager"]),
  async ({ restaurantId, waiterIds, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to create tables for this restaurant")

    // Get existing table
    const table = await db.table.findFirst({
      where: { restaurantId, name: data.name },
      select: { id: true, deleted: true, waiters: { select: { id: true } } },
    })

    // Restore table
    if (table != null) {
      if (!table.deleted)
        throw new Error(`Cannot create table with name '${data.name}', such table already exists`)
      else
        return db.table.update({
          where: { id: table.id },
          data: {
            ...data,
            deleted: false,
            waiters: {
              disconnect: table.waiters.map(({ id }) => ({ id })),
              connect: waiterIds.map((id) => ({ id })),
            },
          },
        })
    }

    // Create table
    return db.table.create({
      data: {
        restaurant: { connect: { id: restaurantId } },
        ...data,
        waiters: {
          connect: waiterIds.map((id) => ({ id })),
        },
      },
    })
  }
)
