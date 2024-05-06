import { resolver } from "@blitzjs/rpc"
import db from "../../../../db/db"
import { id } from "../../validation"

export default resolver.pipe(resolver.zod(id), resolver.authorize("Admin"), (id) => {
  // TODO delete images & models
  return db.restaurant.delete({ where: { id } })
})
