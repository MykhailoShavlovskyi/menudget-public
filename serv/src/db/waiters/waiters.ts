import db from "../../../db/db"
import { User } from "@prisma/client"
import { Role } from "../../definitions/Role"

export type Waiter = Pick<User, "id" | "name" | "email">
export type WaiterIndex = Omit<Waiter, "email">
export type WaiterWithTables = Waiter & {
  tableIds: number[]
}

export async function getWaiters(restaurantId: number): Promise<Waiter[]> {
  return db.user.findMany({
    where: { restaurantId, role: Role.Waiter, deleted: false },
    select: { id: true, name: true, email: true },
  })
}

export async function getWaiterIndex(restaurantId: number): Promise<WaiterIndex[]> {
  return db.user.findMany({
    where: { restaurantId, role: Role.Waiter, deleted: false },
    select: { id: true, name: true },
  })
}

export async function getWaiterWithTables(id: number): Promise<WaiterWithTables> {
  const { tables, ...waiter } = await db.user.findUniqueOrThrow({
    where: { id },
    select: { id: true, name: true, email: true, tables: { select: { id: true } } },
  })
  return { ...waiter, tableIds: tables.map((v) => v.id) }
}

export async function waiterExists(
  restaurantId: number | string,
  id: number | string
): Promise<boolean> {
  if (typeof restaurantId == "string" || Number.isNaN(restaurantId)) return false
  if (typeof id == "string" || Number.isNaN(id)) return false

  const user = await db.user.findFirst({
    where: { restaurantId, id, role: Role.Waiter, deleted: false },
    select: { id: true },
  })
  return user != null
}
