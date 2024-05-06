import { Order } from "@prisma/client"
import db from "../../../db/db"
import { OrderState } from "../../definitions/OrderState"
import { Role } from "../../definitions/Role"
import Fuse from "fuse.js"

export type OrderPick = Pick<Order, "id" | "state" | "notes" | "payed" | "delivered"> & {
  table: string
  createdAt: Date
  dishes: {
    id: number
    name: string
    count: number
    price: number
  }[]
}

export type ArchiveOrder = Pick<Order, "id"> & {
  table: string
  createdAt: Date
  waiterName: string
  dishes: {
    name: string
    count: number
    total: number
  }[]
}

export async function getOrders(restaurantId: number): Promise<OrderPick[]> {
  const orders = await db.order.findMany({
    where: { restaurantId },
    select: {
      id: true,
      createdAt: true,
      state: true,
      notes: true,
      payed: true,
      delivered: true,
      table: { select: { name: true } },
      dishes: { select: { dish: { select: { id: true, name: true, price: true } }, count: true } },
    },
  })

  return orders.map(({ table, dishes, ...rest }) => ({
    table: table?.name ?? "None",
    dishes: dishes.map(({ dish, count }) => ({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      count,
    })),
    ...rest,
  }))
}

export const takeOrders = 5
export async function getArchiveOrders(
  restaurantId: number,
  page: number,
  filter?: string
): Promise<{ count: number; orders: ArchiveOrder[] }> {
  // Find orders
  const orders = await db.order.findMany({
    where: { restaurantId, state: OrderState.Archived },
    select: {
      id: true,
      createdAt: true,
      table: { select: { name: true } },
      dishes: { select: { dish: { select: { name: true, price: true } }, count: true } },
      user: { select: { role: true, name: true } },
    },
    //take: takeOrders,
    //skip: (page - 1) * takeOrders,
  })

  // Filter orders
  const fuse = new Fuse(orders, {
    threshold: 0.35,
    useExtendedSearch: true,
    keys: ["table.name", "user.name"],
  })
  const searchedOrders =
    filter !== "" && filter != null ? fuse.search(filter).map((v) => v.item) : orders

  // Select orders
  const count = searchedOrders.length
  const pickedOrders: typeof searchedOrders = []
  const skip = (page - 1) * takeOrders
  for (let i = skip; i < skip + takeOrders; i++) {
    searchedOrders[i] && pickedOrders.push(searchedOrders[i] as any)
  }

  // Map orders
  const mappedOrders = pickedOrders.map(({ table, dishes, user, ...rest }) => ({
    table: table?.name ?? "None",
    waiterName: user?.role === Role.Waiter || user?.role === Role.Manager ? user?.name : "-",
    dishes: dishes.map(({ dish, count }) => ({
      name: dish.name,
      count,
      total: dish.price * count,
    })),
    ...rest,
  }))

  return {
    count,
    orders: mappedOrders,
  }
}

export async function getTableOrders(tableId: number) {
  const orders = await db.order.findMany({
    where: {
      tableId,
      OR: [
        { state: OrderState.Pending },
        { state: OrderState.InProgress },
        { state: OrderState.Done },
      ],
    },
    select: { dishes: true, state: true, createdAt: true },
  })

  return orders
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
    .map(({ dishes, state }) => ({ dishes, state }))
}

export async function getActiveOrders(restaurantId: number) {
  const tables = await db.table.findMany({
    where: {
      restaurantId,
      idle: false,
    },
    select: {
      id: true,
      name: true,
      idle: true,
      orders: {
        where: {
          OR: [
            { state: OrderState.Pending },
            { state: OrderState.InProgress },
            { state: OrderState.Done },
          ],
        },
        select: {
          id: true,
          createdAt: true,
          state: true,
          payed: true,
          delivered: true,
          dishes: {
            select: {
              id: true,
              count: true,
              dish: { select: { id: true, name: true, price: true, imageKeys: true } },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  })

  return tables.flatMap((v) => {
    return v.orders.map(({ dishes, ...o }) => ({
      ...o,
      dishes: dishes.map((d) => ({
        id: d.dish.id,
        name: d.dish.name,
        count: d.count,
        price: d.dish.price,
        imageKeys: d.dish.imageKeys,
      })),
      tableId: v.id,
      tableName: v.name,
      tableIdle: v.idle,
    }))
  })
}

export async function submitOrder(
  restaurantId: number,
  tableId: number,
  notes: string,
  promo: string,
  dishes: {
    dishId: number
    count: number
  }[]
) {
  return db.$transaction([
    db.order.create({
      data: {
        restaurantId,
        tableId,
        notes: notes,
        promo: promo,
        dishes: { createMany: { data: dishes } },
      },
    }),
    db.table.update({ where: { id: tableId }, data: { idle: false } }),
  ])
}
