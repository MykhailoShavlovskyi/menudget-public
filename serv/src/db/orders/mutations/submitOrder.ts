import { array, number, object, string } from "zod"
import { resolver } from "@blitzjs/rpc"
import { submitOrder } from "../orders"
import { id } from "../../validation"

export const SubmitOrder = object({
  restaurantId: id,
  tableId: id,
  notes: string().max(300),
  promo: string().max(20),
  dishes: array(object({ dishId: id, count: number().int().positive() })),
})

export default resolver.pipe(
  resolver.zod(SubmitOrder),
  ({ restaurantId, tableId, notes, promo, dishes }) =>
    submitOrder(restaurantId, tableId, notes, promo, dishes)
)
