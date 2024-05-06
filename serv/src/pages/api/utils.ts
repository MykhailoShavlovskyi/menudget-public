import { AuthenticationError } from "blitz"
import { hash256 } from "@blitzjs/auth"
import db from "../../../db/db"
import { Role } from "../../definitions/Role"

export async function authorizeSession(action: string, key: string | null, restaurantId: number) {
  if (key == null) throw new AuthenticationError("No key provided")

  // Get session
  const session = await db.appSession.findFirst({
    where: { key: hash256(key) },
    select: {
      id: true,
      createdAt: true,
      user: { select: { role: true, restaurantId: true } },
    },
  })
  if (session == null) throw new AuthenticationError("No session found")
  if (new Date(session.createdAt).getHours() + new Date().getHours() > 96) {
    await db.appSession.delete({ where: { id: session.id } })
    throw new AuthenticationError(`Cannot ${action}, session expired`)
  }
  if (session.user.role !== Role.Admin && session.user.restaurantId !== Number(restaurantId)) {
    throw new AuthenticationError(`Cannot ${action} in a foreign company`)
  }

  return true
}
