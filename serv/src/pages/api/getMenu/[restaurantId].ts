import { NextApiRequest, NextApiResponse } from "next"
import { getMenu } from "../../../db/dishes/dishes"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle string input
  const { restaurantId } = req.query
  const { tableId } = req.body.data
  if (
    restaurantId == null ||
    isNaN(Number(restaurantId)) ||
    tableId == null ||
    typeof tableId === "string" ||
    isNaN(Number(tableId))
  ) {
    res.statusCode = 500
    res.end()
    return
  }

  // Get menu
  const menu = await getMenu(Number(restaurantId), Number(tableId), false)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(menu))
}
export default handler
