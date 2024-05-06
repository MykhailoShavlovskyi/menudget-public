import { BlitzPage, Routes } from "@blitzjs/next"
import React, { ReactNode } from "react"
import { ContactForm } from "../components/site/ContactForm"
import { SiteLayout } from "../components/site/SiteLayout"

const ContactPage: BlitzPage = () => <ContactForm />

ContactPage.getLayout = (page: ReactNode) => (
  <SiteLayout title="Menudget - Contact">{page}</SiteLayout>
)

// TEMP
export const getServerSideProps = () => ({
  redirect: { destination: Routes.LoginPage().href, permanent: false },
})

export default ContactPage
