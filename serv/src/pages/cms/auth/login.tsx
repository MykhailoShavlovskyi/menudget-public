import { BlitzPage, Routes } from "@blitzjs/next"
import { LoginForm } from "src/containers/cms/auth/LoginForm"
import { Role } from "../../../definitions/Role"
import { gSSP } from "../../../blitz-server"
import { getRole } from "../../../lib/context"
import { AuthLayout } from "../../../components/cms/layout/AuthLayout"
import React, { ReactNode } from "react"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { getTitLogIn } from "../../../messages/auth"

const LoginPage: BlitzPage = () => <AuthLayout title={getTitLogIn()} form={<LoginForm />} />

LoginPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps = gSSP(async ({ ctx }) => {
  const role = getRole(ctx)

  let destination
  if (role === Role.Admin) destination = Routes.RestaurantsPage().href
  if (role === Role.Manager || role === Role.Waiter) destination = Routes.DishesPage().href

  if (destination == null) return { props: {} }
  return {
    redirect: { destination, permanent: false },
  }
})

export default LoginPage
