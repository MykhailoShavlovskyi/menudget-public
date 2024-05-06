import { Dish } from "@prisma/client"
import db from "../../../db/db"
import { getFileUrl, getOptimizedImageUrl } from "../../../s3/s3"
import { Waiter, WaiterIndex } from "../waiters/waiters"
import { Role } from "../../definitions/Role"

export type DishPick = Pick<
  Dish,
  | "id"
  | "name"
  | "description"
  | "price"
  | "featured"
  | "topOfTheWeek"
  | "sticker"
  | "order"
  | "categoryId"
> & {
  imageKey?: string
  measurement: string
}

export type DishSelectDish = Pick<Dish, "id" | "name" | "price">

export type DishIndex = Pick<DishPick, "id" | "name">

export type ResolvedDish = Dish & {
  imageKeys: string[]
  labels: string[]
}

export async function getDishes(restaurantId: number): Promise<DishPick[]> {
  const dishes = await db.dish.findMany({
    where: { restaurantId, deleted: false, category: { deleted: false } },
    select: {
      id: true,
      imageKeys: true,
      name: true,
      description: true,
      measurementValue: true,
      measurementUnit: true,
      price: true,
      featured: true,
      topOfTheWeek: true,
      sticker: true,
      order: true,
      categoryId: true,
    },
  })

  return dishes.map(({ imageKeys, measurementValue, measurementUnit, ...rest }) => ({
    ...rest,
    imageKey: (imageKeys as string[])[0],
    measurement: measurementValue + measurementUnit,
  }))
}

export async function getDishIndex(restaurantId: number): Promise<DishIndex[]> {
  return db.dish.findMany({
    where: { restaurantId, deleted: false },
    select: { id: true, name: true },
  })
}

export async function getDishSelectDishes(restaurantId: number): Promise<DishSelectDish[]> {
  return db.dish.findMany({
    where: { restaurantId, deleted: false, category: { deleted: false } },
    select: {
      id: true,
      name: true,
      price: true,
    },
  })
}

export async function getMenu(
  restaurantId: number,
  tableId: number | undefined = undefined,
  optimizeImages: boolean = true
) {
  const { logoKey, bannerKey, ...restaurant } = await db.restaurant.findUniqueOrThrow({
    where: { id: restaurantId },
    select: {
      id: true,
      name: true,
      description: true,
      openTimes: true,
      closeTimes: true,
      logoKey: true,
      bannerKey: true,
      currency: true,
    },
  })
  const table = tableId
    ? await db.table.findUniqueOrThrow({
        where: { id: tableId },
        select: {
          name: true,
        },
      })
    : null

  const dishes = await db.dish.findMany({
    where: { restaurantId, deleted: false, category: { deleted: false } },
    select: {
      id: true,
      name: true,
      description: true,
      order: true,
      category: { select: { order: true, name: true } },
      measurementUnit: true,
      measurementValue: true,
      price: true,
      spicyLevel: true,
      labels: true,
      ingredients: true,
      featured: true,
      colorBorder: true,
      color: true,
      sticker: true,
      imageKeys: true,
      modelKey: true,
    },
  })

  return {
    restaurant: {
      logoUrl: logoKey
        ? optimizeImages
          ? getOptimizedImageUrl(logoKey)
          : getFileUrl(logoKey)
        : null,
      bannerUrl: bannerKey
        ? optimizeImages
          ? getOptimizedImageUrl(bannerKey)
          : getFileUrl(bannerKey)
        : null,
      ...restaurant,
      openTimes: restaurant.openTimes as number[],
      closeTimes: restaurant.closeTimes as number[],
    },
    dishes: dishes
      .sort((a, b) => {
        const diff = a.category.order - b.category.order
        if (diff === 0) return a.order - b.order
        return diff
      })
      .map(({ imageKeys, modelKey, category, order, ...dish }) => ({
        ...dish,
        labels: dish.labels as string[],
        category: category.name,
        imageUrls: (imageKeys as string[]).map((v) =>
          optimizeImages ? getOptimizedImageUrl(v) : getFileUrl(v)
        ),
        modelUrl: modelKey ? getFileUrl(modelKey) : null,
      })),
    tableId,
    tableName: table?.name ?? "",
  }
}

export async function getDishName(id: number): Promise<string> {
  const { name } = await db.dish.findUniqueOrThrow({
    where: { id },
    select: { name: true },
  })
  return name
}

export async function getDish(id: number): Promise<ResolvedDish> {
  return db.dish.findUniqueOrThrow({ where: { id } }) as Promise<ResolvedDish>
}

export async function dishExists(
  restaurantId: number | string,
  id: number | string
): Promise<boolean> {
  if (typeof restaurantId == "string" || Number.isNaN(restaurantId)) return false
  if (typeof id == "string" || Number.isNaN(id)) return false

  const dish = await db.dish.findFirst({
    where: { restaurantId, id },
    select: { id: true },
  })
  return dish != null
}
