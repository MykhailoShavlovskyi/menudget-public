import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10, "Password must contain at least 10 characters")
  .max(100, "Password must contain not more then 100 characters")
  .transform((str) => str.trim())

export const Signup = z.object({
  name: z.string(),
  email,
  password,
})

export const Login = z.object({
  email,
  password: z.string(),
  remember: z.boolean(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
