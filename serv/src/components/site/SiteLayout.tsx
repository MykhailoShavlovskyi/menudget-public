import Layout from "../common/Layout"
import { Canvas } from "./Canvas"
import { SiteFooter } from "./SiteFooter"
import React, { PropsWithChildren } from "react"

export const SiteLayout = ({
  title,
  children,
}: PropsWithChildren<{
  title?: string
}>) => (
  <Layout key={"site-layout"} title={title}>
    <Canvas />
    {children}
    <SiteFooter />
  </Layout>
)
