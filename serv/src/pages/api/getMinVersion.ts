import { NextApiResponse } from "next"

const handler = async (_, res: NextApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ name: "2.0.0", value: 200 }))
}
export default handler
