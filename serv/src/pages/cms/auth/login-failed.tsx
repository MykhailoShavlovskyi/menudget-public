import { BlitzPage } from "@blitzjs/next"
import Layout from "src/components/common/Layout"
import { GetServerSideProps } from "next"
import { gSSP } from "../../../blitz-server"
import { getUserId } from "../../../lib/context"
import { getQueryParameterByName } from "../../../lib/query-params"
import { LoginFailed } from "../../../components/cms/auth/LoginFailed"
import React, { ReactNode } from "react"
import CmsLayout from "../../../components/cms/layout/CmsLayout"
import { getTitLogInFailed } from "../../../messages/auth"

const LoginFailedPage: BlitzPage = () => (
  <Layout title={getTitLogInFailed()}>
    <LoginFailed error={global.window ? getQueryParameterByName("authError") : undefined} />
  </Layout>
)

LoginFailedPage.getLayout = (page: ReactNode) => <CmsLayout>{page}</CmsLayout>

export const getServerSideProps: GetServerSideProps = gSSP(async ({ ctx }) => {
  const userId = getUserId(ctx)

  if (userId != null) return { redirect: { destination: "/", permanent: false } }
  return { props: {} }
})

export default LoginFailedPage
