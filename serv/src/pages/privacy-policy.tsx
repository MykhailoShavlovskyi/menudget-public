import { BlitzPage, Routes } from "@blitzjs/next"
import React, { ReactNode } from "react"
import { SiteLayout } from "../components/site/SiteLayout"

const PrivacyPolicyPage: BlitzPage = () => null

PrivacyPolicyPage.getLayout = (page: ReactNode) => (
  <SiteLayout title="Menudget - Privacy Policy">{page}</SiteLayout>
)

// TEMP
export const getServerSideProps = () => ({
  redirect: { destination: Routes.LoginPage().href, permanent: false },
})

export default PrivacyPolicyPage
