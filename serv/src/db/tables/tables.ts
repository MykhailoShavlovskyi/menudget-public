import { Table } from "@prisma/client"
import db from "../../../db/db"
import { OrderState } from "../../definitions/OrderState"
import { occupancy } from "../../lib/definitions"

export type TablePick = Pick<Table, "id" | "name"> & {
  occupancy: occupancy
}
export type TableWithWaiters = TablePick & {
  waiterIds: number[]
}

type State = "idle" | "order-in-progress" | "order-ready" | "order-payed"
type TableState = Pick<Table, "id"> & {
  state: State
}

export async function getTables(restaurantId: number): Promise<TablePick[]> {
  return db.table.findMany({
    where: { restaurantId, deleted: false },
    select: { id: true, name: true, occupancy: true },
  }) as Promise<TablePick[]>
}

export async function getTableWithWaiters(id: number): Promise<TableWithWaiters> {
  const { waiters, ...table } = await db.table.findUniqueOrThrow({
    where: { id },
    select: { id: true, name: true, occupancy: true, waiters: { select: { id: true } } },
  })

  return { ...table, waiterIds: waiters.map((v) => v.id) } as TableWithWaiters
}

export async function tableExists(
  restaurantId: number | string,
  id: number | string
): Promise<boolean> {
  if (typeof restaurantId == "string" || Number.isNaN(restaurantId)) return false
  if (typeof id == "string" || Number.isNaN(id)) return false

  const table = await db.table.findFirst({
    where: { restaurantId, id },
    select: { id: true },
  })
  return table != null
}

export async function getTablesState(userId: number): Promise<TableState[]> {
  const tables = await db.table.findMany({
    where: { waiters: { some: { id: userId } } },
    select: {
      id: true,
      name: true,
      idle: true,
      orders: {
        where: { NOT: { OR: [{ state: OrderState.Canceled }, { state: OrderState.Deleted }] } },
        select: {
          state: true,
          payed: true,
        },
      },
    },
  })

  const tablesWithState = tables.map(({ id, idle, name, orders }) => {
    let state: State
    if (orders.some((v) => v.state === OrderState.Done)) state = "order-ready"
    else {
      if (orders.some((v) => v.state === OrderState.InProgress || v.state === OrderState.Pending))
        state = "order-in-progress"
      else {
        if (orders.every((v) => v.payed)) state = idle ? "idle" : "order-payed"
        else state = "order-in-progress"
      }
    }

    return { id, name, state }
  })

  tablesWithState.sort((a, b) => {
    const orders = {
      ["order-ready"]: 0,
      ["order-in-progress"]: 1,
      ["order-payed"]: 2,
      ["idle"]: 3,
    }
    const aOrder = orders[a.state]
    const bOrder = orders[b.state]
    return aOrder - bOrder
  })

  return tablesWithState
}

export async function setTableIdle(id: number) {
  return db.$transaction([
    db.order.updateMany({
      where: { state: OrderState.Done, delivered: true },
      data: { state: OrderState.Archived },
    }),
    db.table.update({ where: { id }, data: { idle: true } }),
  ])
}
