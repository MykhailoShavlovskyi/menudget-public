import { NextApiRequest, NextApiResponse } from "next"
import { getTableOrders } from "../../../db/orders/orders"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle string input
  const { tableId } = req.query
  if (tableId == null || isNaN(Number(tableId))) {
    res.statusCode = 500
    res.end()
  }

  // Get tables
  const order = await getTableOrders(Number(tableId))
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(order))
}
export default handler
