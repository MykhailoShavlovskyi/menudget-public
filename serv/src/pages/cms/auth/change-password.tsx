import { BlitzPage } from "@blitzjs/next"
import { ChangePasswordForm } from "../../../containers/cms/auth/ChangePasswordForm"
import React, { ReactNode } from "react"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { AuthLayout } from "../../../components/cms/layout/AuthLayout"
import { getTitChangePassword } from "../../../messages/auth"

const ChangePasswordPage: BlitzPage = () => (
  <AuthLayout title={getTitChangePassword()} form={<ChangePasswordForm />} />
)

ChangePasswordPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

ChangePasswordPage.redirectAuthenticatedTo = "/"

export default ChangePasswordPage
