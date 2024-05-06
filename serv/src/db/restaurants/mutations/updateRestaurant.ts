import { resolver } from "@blitzjs/rpc"
import { object } from "zod"
import { CreateRestaurant } from "./createRestaurant"
import db from "../../../../db/db"
import { id } from "../../validation"

export const UpdateRestaurant = CreateRestaurant.omit({ managerEmail: true }).merge(object({ id }))

export default resolver.pipe(
  resolver.zod(UpdateRestaurant),
  resolver.authorize(["Admin", "Manager"]),
  ({ id, ...data }) => {
    return db.restaurant.update({ where: { id }, data })
  }
)
