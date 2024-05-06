import { resolver } from "@blitzjs/rpc"
import { array, object, string } from "zod"
import db from "../../../../db/db"
import { email } from "../../auth/validations"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"

const UpdateWaiter = object({
  id,
  name: string().optional(),
  email: email.optional(),
  tableIds: array(id),
})

export default resolver.pipe(
  resolver.zod(UpdateWaiter),
  resolver.authorize(["Admin", "Manager"]),
  async ({ id, tableIds, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    const waiter = await db.user.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true, tables: { select: { id: true } } },
    })
    if (user?.role !== Role.Admin && user?.restaurantId !== waiter.restaurantId)
      throw new Error("User is not allowed to update waiters for this restaurant")

    // Update waiter
    return db.user.update({
      where: { id },
      data: {
        ...data,
        tables: {
          disconnect: waiter?.tables.map(({ id }) => ({ id })),
          connect: tableIds.map((id) => ({ id })),
        },
      },
    })
  }
)
