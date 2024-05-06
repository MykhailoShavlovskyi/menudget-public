import db from "../db"

export async function list() {
  const users = await db.user.findMany()
  const restaurants = await db.restaurant.findMany()
  const categories = await db.category.findMany()
  const dishes = await db.dish.findMany()
  const orders = await db.order.findMany()
  const orderedDishes = await db.orderedDish.findMany()
  const tables = await db.table.findMany()
  console.debug(users, restaurants, categories, dishes, orders, orderedDishes, tables)
}

export default list()
