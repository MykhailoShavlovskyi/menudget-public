import React, { PropsWithChildren } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { createGlobalStyle, css, ThemeProvider } from "styled-components"
import Head from "next/head"
import { IntlProvider } from "../IntlProvider"

declare module "styled-components" {
  export interface DefaultTheme extends CmsTheme {}
}

export type CmsTheme = {
  colors: {
    primary: {
      yellow: string
      orange: string
      darkOrange: string
      black: string
      white: string
    }
    secondary: {
      darkGray: string
      grey: string
      lightGrey: string
      lightOrange: string
      red: string
      lightRed: string
      green: string
      lightGreen: string
      blue: string
      lightBlue: string
    }
    gradient: {
      orange: string
    }
  }
  elevation: {
    xlight: string
    light: string
    medium: string
    large: string
  }
}

const theme: CmsTheme = {
  colors: {
    primary: {
      yellow: "#FFCB06",
      orange: "#FF9C00",
      darkOrange: "#FF7A00",
      black: "#161616",
      white: "#FFFFFF",
    },
    secondary: {
      darkGray: "#828282",
      grey: "#B6B6B6",
      lightGrey: "#F5F5F5",
      lightOrange: "#FFF2DD",
      red: "#FF0000", //EB5757
      lightRed: "#FFE5E5",
      green: "#3CB367",
      lightGreen: "#E5F7E6",
      blue: "#52BEFF",
      lightBlue: "#E3F3FF",
    },
    gradient: {
      orange: "linear-gradient(92deg, #ffcb00 3.59%, #ff9c00 96.62%)",
    },
  },
  elevation: {
    xlight: "0 1px 1px 0 rgba(0, 0, 0, 0.15)",
    light: "0 1px 2px 0 rgba(0, 0, 0, 0.25)",
    medium: "0 2px 4px 0 rgba(0, 0, 0, 0.25)",
    large: "0 4px 8px 0 rgba(0, 0, 0, 0.25)",
  },
}

const step = 0.125
export const spacing = {
  s1: step, // 0.125
  s2: step * 2, // 0.250
  s3: step * 3, // 0.375
  s4: step * 4, // 0.500
  s5: step * 5, // 0.625
  s6: step * 6, // 0.750
  s7: step * 7, // 0.875
  s8: step * 8, // 1.000
  s9: step * 9, // 1.125

  s10: step * 10, // 1.250
  s11: step * 11, // 1.375
  s12: step * 12, // 1.500
  s13: step * 13, // 1.625
  s14: step * 14, // 1.750
  s15: step * 15, // 1.875
  s16: step * 16, // 2.000

  s17: step * 17, // 2.000
}

// Regular headings
export const regH1 = css`
  font-size: 2.25rem;
  font-weight: 400;
  line-height: 3.125rem;
`
export const regH2 = css`
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 2.375rem;
`
export const regH3 = css`
  font-size: 1.625rem;
  font-weight: 400;
  line-height: 2.125rem;
`
export const regH4 = css`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
`

// Regular paragraphs
export const regP1 = css`
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.875rem;
`
export const regP2 = css`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5rem;
`
export const regP3 = css`
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.375rem;
`
export const regP4 = css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;
`
export const regP5 = css`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
`

// Semibold headers
export const semiboldH1 = css`
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 3.125rem;
`
export const semiboldH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 2.375rem;
`
export const semiboldH3 = css`
  font-size: 1.625rem;
  font-weight: 600;
  line-height: 2.125rem;
`
export const semiboldH4 = css`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
`

// Semi bold paragpaphs
export const semiboldP1 = css`
  font-feature-settings: "calt" off, "liga" off;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.875rem;
`
export const semiboldP2 = css`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
`
export const semiboldP3 = css`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
`
export const semiboldP4 = css`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
`
export const semiboldP5 = css`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
`

// Bold headers
export const boldH1 = css`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 3.125rem;
`
export const boldH2 = css`
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.375rem;
`
export const boldH3 = css`
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 2.125rem;
`
export const boldH4 = css`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
`

// Bold paragraphs
export const boldP1 = css`
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.875rem;
`
export const boldP2 = css`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
`
export const boldP3 = css`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.375rem;
`
export const boldP4 = css`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem;
`
export const boldP5 = css`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.125rem;
`

export const flex = css`
  display: flex;
`
export const stack = css`
  display: flex;
  flex-direction: column;
`
export const flexCenter = css`
  justify-content: center;
  align-items: center;
`

export const navbarHeight = 10 // TODO
export const formWidth = 10 // TODO

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Nunito Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-style: normal;
    color: ${(v) => v.theme.colors.primary.black};

    height: 100vh;
    overflow: hidden;
  }
`

const CmsLayout: BlitzLayout<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => (
  <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&display=swap"
        rel="stylesheet"
      />
    </Head>
    <IntlProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div id="root">{children}</div>
      </ThemeProvider>
    </IntlProvider>
  </>
)

export default CmsLayout
