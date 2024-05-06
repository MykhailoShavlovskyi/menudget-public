import { NextApiRequest, NextApiResponse } from "next"

import { setTableIdle } from "../../../db/tables/tables"
import { getActiveOrders } from "../../../db/orders/orders"
import db from "../../../../db/db"
import { authorizeSession } from "../utils"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle string input
  const { tableId } = req.query
  if (tableId == null || isNaN(Number(tableId))) {
    res.statusCode = 500
    res.end()
    return
  }

  // Authorize
  const key = req.body.key
  const { restaurantId } = await db.table.findUniqueOrThrow({
    where: { id: Number(tableId) },
    select: { restaurantId: true },
  })
  await authorizeSession("set table idle", key, restaurantId)

  // Set table idle
  await setTableIdle(Number(tableId))

  // Get orders
  const orders = await getActiveOrders(restaurantId)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(orders))
}
export default handler
