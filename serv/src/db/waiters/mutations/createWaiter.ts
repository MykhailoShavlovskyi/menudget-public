import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import { array, object, string } from "zod"
import db from "../../../../db/db"
import { Role } from "../../../definitions/Role"
import { email } from "../../auth/validations"
import { id } from "../../validation"
import "@blitzjs/auth"
import { getUser } from "../../../lib/context"
import { waiterAccountCreatedMailer } from "../../../../mailers/waiterAccountCreatedMailer"

const CreateWaiter = object({
  restaurantId: id,
  name: string(),
  email,
  tableIds: array(id),
})

export default resolver.pipe(
  resolver.zod(CreateWaiter),
  resolver.authorize(["Admin", "Manager"]),
  async ({ restaurantId, tableIds, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to create waiters for this restaurant")

    // Validate email
    const existingUser = await db.user.findFirst({
      where: { email: data.email },
      select: { id: true, deleted: true, tables: { select: { id: true } } },
    })
    if (existingUser && !existingUser.deleted) {
      throw new Error(`User with email ${data.email} is already registered`)
    }

    // Prepare data
    const password = Math.random().toString(36).substring(2, 8)
    const hashedPassword = await SecurePassword.hash(password)

    // Mutate
    const waiter = existingUser?.deleted
      ? // Restore deleted waiter
        await db.user.update({
          where: { id: existingUser.id },
          data: {
            role: Role.Waiter,
            hashedPassword,
            restaurant: { connect: { id: restaurantId } },
            name: data.name,
            deleted: false,
            tables: {
              disconnect: existingUser?.tables.map(({ id }) => ({ id })),
              connect: tableIds.map((id) => ({ id })),
            },
          },
        })
      : // Create waiter
        await db.user.create({
          data: {
            role: Role.Waiter,
            hashedPassword,
            restaurant: { connect: { id: restaurantId } },
            tables: { connect: tableIds.map((id) => ({ id })) },
            ...data,
          },
        })

    // Send email
    void waiterAccountCreatedMailer({ to: data.email, user_password: password }).send()

    return waiter
  }
)
