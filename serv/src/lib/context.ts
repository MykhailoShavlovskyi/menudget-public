import { Ctx } from "blitz"
import db from "../../db/db"

export function getRole(ctx: Ctx) {
  return ctx?.session.$publicData.role
}

export function getUserId(ctx: Ctx) {
  return ctx?.session.$publicData.userId
}

export async function getUser(ctx: Ctx) {
  const id = getUserId(ctx)
  if (id == null) return null

  return db.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      restaurantId: true,
    },
  })
}
