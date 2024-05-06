import { resolver } from "@blitzjs/rpc"
import { object, string } from "zod"
import { id } from "../../validation"
import { email } from "../validations"
import db from "../../../../db/db"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import login from "./login"

export const UpdatePassword = object({
  id,
  password: string().min(6),
})

export default resolver.pipe(
  resolver.zod(UpdatePassword),
  resolver.authorize(["Admin", "Manager", "Waiter"]),
  async ({ id, password }, ctx) => {
    // Authorize
    const { userId } = ctx.session
    if (userId !== id) throw new Error("User is not allowed to update email of other users")

    // Mutate
    const hashedPassword = await SecurePassword.hash(password.trim())
    await db.$transaction([
      db.user.update({ where: { id }, data: { hashedPassword } }),
      db.session.deleteMany({ where: { userId: id } }),
    ])

    // Re log-in
    const { email } = await db.user.findUniqueOrThrow({ where: { id }, select: { email: true } })
    await login({ email, password, remember: false }, ctx)
  }
)
