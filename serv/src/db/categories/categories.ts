import { Category } from "@prisma/client"
import db from "../../../db/db"

export type CategoryPick = Pick<Category, "id" | "name" | "order">

export function getCategory(id: number) {
  return db.category.findUnique({
    where: { id, deleted: false },
    select: { id: true, name: true, order: true },
  })
}

export function getCategories(restaurantId: number) {
  return db.category.findMany({
    where: { restaurantId, deleted: false },
    select: { id: true, name: true, order: true },
  })
}
