import { resolver } from "@blitzjs/rpc"
import { array, number, object, string } from "zod"
import db from "../../../../db/db"
import { Role } from "../../../definitions/Role"
import { id } from "../../validation"
import { getUser } from "../../../lib/context"

const CreatePromo = object({
  restaurantId: id,
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
  resolver.zod(CreatePromo),
  resolver.authorize(["Admin", "Manager"]),
  async ({ restaurantId, dishIds, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to create promos for this restaurant")

    // Create promo
    return db.promo.create({
      data: {
        restaurant: { connect: { id: restaurantId } },
        ...data,
        dishes: { connect: dishIds.map((id) => ({ id })) },
      },
    })
  }
)
