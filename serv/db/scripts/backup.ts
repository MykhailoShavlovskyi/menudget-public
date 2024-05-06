import fs from "fs"
import db from "../db"

async function list() {
  const users = await db.user.findMany()
  const restaurants = await db.restaurant.findMany()
  const categories = await db.category.findMany()
  const dishes = await db.dish.findMany()
  const orders = await db.order.findMany()
  const orderedDishes = await db.orderedDish.findMany()
  const tables = await db.table.findMany()
  return { users, restaurants, categories, dishes, orders, orderedDishes, tables }
}

async function backup() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  readline.question("Enter backup name", async (name) => {
    const data = await list()
    const json = JSON.stringify(data, undefined, 3)
    if (!fs.existsSync("db/backups")) fs.mkdirSync("db/backups")
    fs.writeFileSync(`db/backups/${name}.json`, json, "utf8")
    readline.close()
  })
}

export default backup()
