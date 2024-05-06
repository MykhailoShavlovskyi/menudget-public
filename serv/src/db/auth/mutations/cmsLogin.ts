import { SecurePassword } from "@blitzjs/auth/secure-password"
import "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db/db"
import { Role } from "../../../definitions/Role"
import { Login } from "../validations"
import { Role as RoleEnum } from "types"

async function authenticateUser(rawEmail: string, rawPassword: string) {
  const { email, password } = Login.omit({ remember: true }).parse({
    email: rawEmail,
    password: rawPassword,
  })
  const user = await db.user.findFirst({ where: { email } })
  if (!user) throw new AuthenticationError()
  if (user.role === Role.User) throw new AuthenticationError("Invalid role")

  const result = await SecurePassword.verify(user.hashedPassword, password)
  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password, remember }, ctx) => {
  // Authenticate user
  const user = await authenticateUser(email, password)

  // Create session
  await ctx.session.$create({ userId: user.id, role: user.role as RoleEnum })

  // Set expires date
  if (remember) {
    const neverExpiresDate = new Date()
    neverExpiresDate.setFullYear(neverExpiresDate.getFullYear() + 1)
    await db.session.update({
      where: { handle: ctx.session.$handle! },
      data: { expiresAt: neverExpiresDate },
    })
  }

  return user
})
