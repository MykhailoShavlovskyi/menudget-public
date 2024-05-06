import { resolver } from "@blitzjs/rpc"
import db from "../../../../db/db"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { array, number, object, string } from "zod"

const UpdatePromo = object({
  id,
  name: string(),
  percentageDiscount: number().min(0).max(100).optional().nullable(),
  fixedDiscount: number().min(0).max(9999).optional().nullable(),
  maxUseCount: number().min(0).optional().nullable(),
  dishIds: array(id),
}).refine((v) => {
  const hasPercentage = v.percentageDiscount == null /*&& v.percentageDiscount !== ""*/
  const hasFixed = v.fixedDiscount == null /*&& v.fixedDiscount !== ""*/
  if (!hasPercentage && !hasFixed) return false
  if (hasPercentage && hasFixed) return false
  return true
}, "Either one of percentage discount or fixed discount must be provided")

export default resolver.pipe(
  resolver.zod(UpdatePromo),
  resolver.authorize(["Admin", "Manager"]),
  async ({ id, dishIds, ...data }, ctx) => {
    // Get promo
    const promo = await db.promo.findUniqueOrThrow({
      where: { id },
      select: { restaurantId: true, dishes: { select: { id: true } } },
    })

    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== promo.restaurantId)
      throw new Error("User is not allowed to update promos for this restaurant")

    // Update promo
    return db.promo.update({
      where: { id },
      data: {
        ...data,
        dishes: {
          disconnect: promo.dishes.map(({ id }) => ({ id })),
          connect: dishIds.map((id) => ({ id })),
        },
      },
    })
  }
)
