import { NextApiRequest, NextApiResponse } from "next"
import { authorizeSession } from "../utils"
import db from "../../../../db/db"
import { getActiveOrders } from "../../../db/orders/orders"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle string input
  const { id } = req.query
  if (id == null || isNaN(Number(id))) {
    res.statusCode = 500
    res.end()
    return
  }

  // Authorize
  const key = req.body.key
  const { restaurantId } = await db.order.findUniqueOrThrow({
    where: { id: Number(id) },
    select: { restaurantId: true },
  })
  await authorizeSession("set order payed", key, restaurantId)

  // Set order payed
  await db.order.update({ where: { id: Number(id) }, data: { payed: true } })

  // Get orders
  const orders = await getActiveOrders(Number(restaurantId))
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(orders))
}
export default handler
