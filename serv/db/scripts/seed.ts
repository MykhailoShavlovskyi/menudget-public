import db from "../db"
import { OrderState } from "../../src/definitions/OrderState"
import { SecurePassword } from "@blitzjs/auth/secure-password"

async function seed() {
  // Restaurant
  const restaurant = await db.restaurant.create({ data: {} })

  // Dishes
  const category = await db.category.create({
    data: { restaurantId: restaurant.id, name: "New category", order: 0 },
  })
  const dish1 = await db.dish.create({
    data: { restaurantId: restaurant.id, categoryId: category.id, name: "Steak", order: 0 },
  })
  const dish2 = await db.dish.create({
    data: { restaurantId: restaurant.id, categoryId: category.id, name: "Fanta", order: 1 },
  })

  // Tables
  const table1 = await db.table.create({ data: { restaurantId: restaurant.id, name: "Corner 21" } })
  const table2 = await db.table.create({ data: { restaurantId: restaurant.id, name: "Sofa 42" } })

  // Orders
  await db.order.create({
    data: {
      restaurantId: restaurant.id,
      tableId: table1.id,
      dishes: { createMany: { data: [{ dishId: dish1.id, count: 2 }] } },
      payed: true,
    },
  })
  await db.order.create({
    data: {
      restaurantId: restaurant.id,
      tableId: table2.id,
      dishes: {
        createMany: {
          data: [
            { dishId: dish1.id, count: 1 },
            { dishId: dish2.id, count: 1 },
          ],
        },
      },

      notes: "Please dont add nuts",
    },
  })
  for (let i = 0; i < 0; i++)
    await db.order.create({
      data: {
        restaurantId: restaurant.id,
        tableId: table1.id,
        dishes: { createMany: { data: [{ dishId: dish1.id, count: 2 }] } },
        state: OrderState.Archived,
        payed: true,
        delivered: true,
      },
    })

  // Users
  const hashedPassword = await SecurePassword.hash("test")
  await db.user.create({
    data: { name: "Admin", email: "admin@menudget.com", hashedPassword, role: "Admin" },
  })
  await db.user.create({
    data: { name: "Test", email: "d.shavlovskyi@utwente.nl", hashedPassword, role: "Admin" },
  })
  await db.user.create({
    data: {
      name: "Manager",
      email: "manager@menudget.com",
      hashedPassword,
      role: "Manager",
      restaurantId: restaurant.id,
    },
  })
  await db.user.create({
    data: {
      name: "Waiter",
      email: "waiter@menudget.com",
      hashedPassword,
      role: "Waiter",
      restaurantId: restaurant.id,
    },
  })
}

export default seed()
