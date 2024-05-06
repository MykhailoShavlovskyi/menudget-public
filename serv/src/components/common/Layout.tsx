import Head from "next/head"
import React, { PropsWithChildren } from "react"
import { BlitzLayout } from "@blitzjs/next"

const Layout: BlitzLayout<
  PropsWithChildren<{
    title?: string
  }>
> = ({ title, children }) => (
  <>
    <Head>
      <title>{title || "Menudget"}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
)

export default Layout
