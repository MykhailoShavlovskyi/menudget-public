import { NextApiRequest, NextApiResponse } from "next"
import { getTablesState } from "../../db/tables/tables"
import db from "../../../db/db"
import { AuthenticationError } from "blitz"
import { Role } from "../../definitions/Role"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { email } from "../../db/auth/validations"
import { generateToken, hash256 } from "@blitzjs/auth"
import { User } from "@prisma/client"
import { z } from "zod"
import { getMenu } from "../../db/dishes/dishes"

const AppLogin = z.object({
  email: email.optional(),
  password: z.string().optional(),
})

async function authenticateUser(rawEmail: string, rawPassword: string) {
  const { email, password } = AppLogin.parse({
    email: rawEmail,
    password: rawPassword,
  })

  // Verify user
  const user = await db.user.findFirst({
    where: { email },
  })
  if (!user) throw new AuthenticationError("No user found")
  const { hashedPassword, ...userRest } = user
  if (user.role !== Role.Admin && user.role !== Role.Manager && user.role !== Role.Waiter)
    throw new AuthenticationError("Invalid role")

  // Verify password
  const result = await SecurePassword.verify(user.hashedPassword, password)
  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  // Create session
  const sessionKey = generateToken()
  const hashedKey = hash256(sessionKey)
  await db.appSession.create({ data: { userId: user.id, key: hashedKey } })

  return { restaurantId: user.restaurantId, user: userRest, key: sessionKey }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email
  const password = req.body.password
  const data = await authenticateUser(email, password)
  const {
    restaurantId,
    user,
    key: newKey,
  } = data as {
    restaurantId: number
    user: Partial<User>
    key?: string
  }

  const tables = await getTablesState(user.id as number)
  const { restaurant, dishes } = await getMenu(Number(restaurantId))

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ key: newKey, user, restaurant, tables, dishes }))
}
export default handler
