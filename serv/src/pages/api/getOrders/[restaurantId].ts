import { NextApiRequest, NextApiResponse } from "next"
import { authorizeSession } from "../utils"
import { getOrders } from "../../../db/orders/orders"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle string input
  const { restaurantId } = req.query
  if (restaurantId == null || isNaN(Number(restaurantId))) {
    res.statusCode = 500
    res.end()
    return
  }

  // Authorize
  const key = req.body.key
  await authorizeSession("get restaurant orders", key, Number(restaurantId))

  // Get orders
  const orders = await getOrders(Number(restaurantId))
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(orders))
}
export default handler
