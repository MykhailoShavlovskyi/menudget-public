import { number, string } from "zod"

export const id = number().positive().int()

const guidPattern = "[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]*"
const imageExtensionPattern = "(jpg|jpeg|png|svg)"
const modelExtensionPattern = "(glb)"

export const guid = string().regex(new RegExp(guidPattern))

export const restaurantFileKey = string().regex(
  new RegExp(`[0-9]\/restaurant\/${guidPattern}.${imageExtensionPattern}`),
  "Provided restaurant file key is not in correct format"
)
