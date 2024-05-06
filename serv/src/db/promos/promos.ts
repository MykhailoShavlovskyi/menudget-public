import db from "../../../db/db"
import { Promo } from "@prisma/client"

export type ResolvedPromo = Promo & { dishIds: number[] }

export async function getPromos(restaurantId: number): Promise<Promo[]> {
  return db.promo.findMany({
    where: { restaurantId },
  })
}

export async function getResolvedPromo(id: number): Promise<ResolvedPromo> {
  const { dishes, ...promo } = await db.promo.findUniqueOrThrow({
    where: { id },
    include: { dishes: { select: { id: true } } },
  })
  return { ...promo, dishIds: dishes.map((v) => v.id) }
}

export async function promoExists(
  restaurantId: number | string,
  id: number | string
): Promise<boolean> {
  if (typeof restaurantId == "string" || Number.isNaN(restaurantId)) return false
  if (typeof id == "string" || Number.isNaN(id)) return false

  const promo = await db.promo.findUnique({
    where: { id },
    select: { id: true },
  })
  return promo != null
}
