import { NextApiRequest, NextApiResponse } from "next"
import { getTablesState } from "../../../db/tables/tables"
import { authorizeSession } from "../utils"
import db from "../../../../db/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle string input
  const { userId } = req.query
  if (userId == null || isNaN(Number(userId))) {
    res.statusCode = 500
    res.end()
    return
  }

  // Get restaurantId
  const { restaurantId } = await db.user.findUniqueOrThrow({
    where: { id: Number(userId) },
    select: { restaurantId: true },
  })

  // Authorize
  const key = req.body.key
  await authorizeSession("get restaurant tables", key, Number(restaurantId))

  // Get tables
  const tables = await getTablesState(Number(userId))
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(tables))
}

export default handler
