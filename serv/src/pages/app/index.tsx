import { BlitzPage } from "@blitzjs/next"
import React, { ReactNode } from "react"
import { AppLayout } from "../../components/app/AppLayout"

const AppHomePage: BlitzPage = () => null

AppHomePage.getLayout = (page: ReactNode) => <AppLayout title="Menudget">{page}</AppLayout>

export default AppHomePage
