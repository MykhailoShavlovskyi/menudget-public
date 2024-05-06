import { resolver } from "@blitzjs/rpc"
import { object } from "zod"
import { id } from "../../validation"
import { email } from "../validations"
import db from "../../../../db/db"

export const UpdateEmail = object({
  id,
  email,
})

export default resolver.pipe(
  resolver.zod(UpdateEmail),
  resolver.authorize(["Admin", "Manager", "Waiter"]),
  async ({ id, email }, ctx) => {
    // Authorize
    const { role, userId } = ctx.session
    if (role !== "Admin" && userId !== id)
      throw new Error("User is not allowed to update email of other users")

    // Update
    return db.user.update({ where: { id }, data: { email } })
  }
)
