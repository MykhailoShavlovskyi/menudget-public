import { resolver } from "@blitzjs/rpc"
import * as zod from "zod"
import { array, boolean, number, object, string, z } from "zod"
import { id } from "../../validation"
import db from "../../../../db/db"
import { getUser } from "../../../lib/context"
import { Role } from "../../../definitions/Role"
import { DishLabel } from "../../../lib/definitions"
import { Sticker } from "../../../definitions/Sticker"

const label = zod
  .enum(Object.values(DishLabel) as [string, ...string[]])
  .transform((v) => v as DishLabel)

export const CreateDish = object({
  restaurantId: id,
  name: string().min(3).optional(),
  description: string().min(3).optional(),
  ingredients: string().optional(),
  categoryId: id,
  measurementUnit: string().max(10).optional(),
  measurementValue: number().positive().optional(),
  price: number().positive().optional(),
  discount: number().int().min(0).max(100).optional().nullable(),
  calories: number().int().positive().optional().nullable(),
  fat: number().positive().optional().nullable(),
  protein: number().positive().optional().nullable(),
  carbs: number().positive().optional().nullable(),
  spicyLevel: number().int().min(0).max(5).optional(),
  labels: array(label).min(1, "At least 1 label should be selected").optional(),
  colorBorder: boolean().optional(),
  color: string()
    .regex(new RegExp("^#[0-9a-fA-F]{6}"), "Color value is not a valid hex")
    .nullable()
    .optional(),
  sticker: z
    .enum(Object.keys(Sticker) as [string, ...string[]])
    .optional()
    .nullable(),
  imageKeys: array(string()).optional(),
  modelKey: string().optional().nullable(),
})

export default resolver.pipe(
  resolver.zod(CreateDish),
  resolver.authorize(["Admin", "Manager"]),
  async ({ restaurantId, categoryId, ...data }, ctx) => {
    // Validate restaurantId
    const user = await getUser(ctx)
    if (user?.role !== Role.Admin && user?.restaurantId !== restaurantId)
      throw new Error("User is not allowed to create dishes for this restaurant")

    // Get dish
    const dish = await db.dish.findFirst({
      where: { restaurantId, name: data.name },
      select: { id: true, deleted: true },
    })

    // Restore dish
    if (dish) {
      if (!dish.deleted)
        throw new Error(`Cannot create dish with name '${data.name}', such name already exists`)
      else return db.dish.update({ where: { id: dish.id }, data: { deleted: false } })
    }

    // Create dish
    const category = await db.category.findUniqueOrThrow({
      where: { id: categoryId },
      select: { id: true, dishes: { select: { order: true } } },
    })
    const maxOrder = Math.max(-1, ...category.dishes.map((v) => v.order))
    return db.dish.create({
      data: {
        restaurant: { connect: { id: restaurantId } },
        category: { connect: { id: category.id } },
        ...data,
        order: maxOrder + 1,
      },
    })
  }
)
