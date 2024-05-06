import { NavBar } from "../../../containers/cms/NavBar"
import React, { PropsWithChildren } from "react"
import { ErrorComponent } from "@blitzjs/next"
import styled from "styled-components"
import dynamic from "next/dynamic"
import Head from "next/head"
import { getMsgErr403 } from "../../../messages/layout"

const Alerts = dynamic(() => import("../Alerts"), { ssr: false })

const StyledContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

export type CmsGridProps = PropsWithChildren<{
  id?: string
  title?: string
  notAllowed?: boolean
  role?: string
}>

const Error403 = () => <ErrorComponent statusCode={403} title={getMsgErr403()} />

export const CmsNav = ({ id, title, notAllowed, role, children }: CmsGridProps) => (
  <>
    <Head>
      <title>{title || "Menudget"}</title>
    </Head>
    {notAllowed ? (
      <Error403 />
    ) : (
      <StyledContainer id={id}>
        <NavBar role={role} />
        {children}
        <Alerts />
      </StyledContainer>
    )}
  </>
)
