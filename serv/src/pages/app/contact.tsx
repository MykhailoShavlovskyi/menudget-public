import { BlitzPage } from "@blitzjs/next"
import React, { ReactNode } from "react"
import { AppLayout } from "../../components/app/AppLayout"
import { Contact } from "../../components/app/Contact"

const AppContactPage: BlitzPage = () => <Contact />

AppContactPage.getLayout = (page: ReactNode) => (
  <AppLayout title="Menudget - Contact">{page}</AppLayout>
)

export default AppContactPage
