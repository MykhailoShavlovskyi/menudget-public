import { NextApiRequest, NextApiResponse } from "next"
import { submitOrder } from "../../db/orders/orders"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create order
  const { restaurantId, tableId, notes, promo, dishes } = req.body
  await submitOrder(restaurantId, tableId, notes, promo, dishes)

  // End request
  res.statusCode = 200
  res.end()
}
export default handler
