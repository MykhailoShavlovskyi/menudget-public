import { NextApiRequest, NextApiResponse } from "next"
import { getTablesState } from "../../db/tables/tables"
import db from "../../../db/db"
import { hash256 } from "@blitzjs/auth"
import { User } from "@prisma/client"
import { z } from "zod"
import { getMenu } from "../../db/dishes/dishes"

const AuthorizeSession = z.object({
  key: z.string(),
})

async function authorizeSession(rawKey: string) {
  const { key } = AuthorizeSession.parse({
    key: rawKey,
  })

  const session = await db.appSession.findFirst({
    where: { key: hash256(key) },
    include: { user: true },
  })
  if (session == null) {
    return false
  }
  if (new Date(session.createdAt).getHours() + new Date().getHours() > 96) {
    await db.appSession.delete({ where: { id: session.id } })
    return false
  }

  const { hashedPassword, ...userRest } = session.user
  return { restaurantId: session.user.restaurantId, user: userRest }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.body.key
  const data = await authorizeSession(key)

  if (data === false) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(false))
  }

  const { restaurantId, user } = data as {
    restaurantId: number
    user: Partial<User>
    key?: string
  }
  const tables = await getTablesState(user.id as number)
  const { restaurant, dishes } = await getMenu(Number(restaurantId))

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ user, restaurant, tables, dishes }))
}
export default handler
