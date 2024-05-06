import { Restaurant } from "@prisma/client"
import db from "../../../db/db"

export type RestaurantPick = Pick<
  Restaurant,
  "id" | "name" | "description" | "bannerKey" | "logoKey"
> & {
  openTimes: [number, number, number, number, number, number, number]
  closeTimes: [number, number, number, number, number, number, number]
}
export type RestaurantIndex = Pick<Restaurant, "id" | "name">

export async function getRestaurants(): Promise<RestaurantPick[]> {
  return (await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      logoKey: true,
      bannerKey: true,
      openTimes: true,
      closeTimes: true,
    },
  })) as RestaurantPick[]
}

export async function getRestaurantIndex(): Promise<RestaurantIndex[]> {
  return await db.restaurant.findMany({
    select: { id: true, name: true },
  })
}

export async function getRestaurant(id: number | string): Promise<Restaurant | null> {
  if (typeof id == "string" || Number.isNaN(id)) return null

  return db.restaurant.findUnique({ where: { id } })
}

export async function getRestaurantName(id: number): Promise<string> {
  const { name } = await db.restaurant.findUniqueOrThrow({
    where: { id },
    select: { name: true },
  })
  return name
}

export async function getRestaurantCurrency(id: number): Promise<string> {
  const { currency } = await db.restaurant.findUniqueOrThrow({
    where: { id },
    select: { currency: true },
  })
  return currency
}

export async function restaurantExists(id: number | string): Promise<boolean> {
  if (typeof id == "string" || Number.isNaN(id)) return false

  const restaurant = await db.restaurant.findUnique({
    where: { id },
    select: { id: true },
  })
  return restaurant != null
}
