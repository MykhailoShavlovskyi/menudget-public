import { BlitzPage } from "@blitzjs/next"
import { ForgotPasswordForm } from "../../../containers/cms/auth/ForgotPasswordForm"
import React, { ReactNode } from "react"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { AuthLayout } from "../../../components/cms/layout/AuthLayout"
import { getTitForgotPassword } from "../../../messages/auth"

const ForgotPasswordPage: BlitzPage = () => (
  <AuthLayout title={getTitForgotPassword()} form={<ForgotPasswordForm />} />
)

ForgotPasswordPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export default ForgotPasswordPage
