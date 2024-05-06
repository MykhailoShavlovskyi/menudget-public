import { resolver } from "@blitzjs/rpc"
import { array, number, object, string, z } from "zod"
import db from "../../../../db/db"
import { restaurantFileKey } from "../../validation"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { restaurantAccountCreatedMailer } from "../../../../mailers/restaurantAccountCreatedMailer"

export const CreateRestaurant = object({
  name: string().optional(),
  description: string().optional(),
  currency: z.enum(["eur", "usd"]).optional(),
  managerEmail: string().email(),
  openTimes: array(number()).optional(),
  closeTimes: array(number()).optional(),
  logoKey: restaurantFileKey.optional().nullable(),
  bannerKey: restaurantFileKey.optional().nullable(),
})

export default resolver.pipe(
  resolver.zod(CreateRestaurant),
  resolver.authorize("Admin"),
  async ({ managerEmail, ...data }) => {
    // Validate email
    const existingUser = await db.user.findFirst({ where: { email: managerEmail } })
    if (existingUser) {
      throw new Error(`User with email ${managerEmail} is already registered`)
    }

    // Mutate DB
    const { restaurant, managerPassword } = await db.$transaction(async (tx) => {
      // Create restaurant
      const restaurant = await tx.restaurant.create({ data })

      // Create category
      const hasCategories = await tx.category.findFirst({ where: { restaurantId: restaurant.id } })
      if (!hasCategories)
        await tx.category.create({
          data: { restaurantId: restaurant.id, order: 0, name: "New category" },
        })

      // Create manager
      const managerPassword = Math.random().toString(36).substring(2, 8)
      await tx.user.create({
        data: {
          name: `${restaurant.name} Manager`,
          email: managerEmail,
          role: "Manager",
          hashedPassword: await SecurePassword.hash(managerPassword),
          restaurantId: restaurant.id,
        },
      })
      return { restaurant, managerPassword }
    })

    // Send email to manager
    await restaurantAccountCreatedMailer({
      to: managerEmail,
      user_password: managerPassword,
    }).send()

    return restaurant
  }
)
