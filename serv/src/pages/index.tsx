import { BlitzPage, Routes } from "@blitzjs/next"
import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import { PhoneIllustration1 } from "../components/site/PhoneIllustration1"
import { PhoneIllustration2 } from "../components/site/PhoneIllustration2"
import { PhoneIllustration3 } from "../components/site/PhoneIllustration3"
import { PhoneIllustration4 } from "../components/site/PhoneIllustration4"
import { PhoneIllustration5 } from "../components/site/PhoneIllustration5"
import { SiteHeading } from "../components/site/SiteHeading"
import { ContactForm } from "../components/site/ContactForm"
import { SiteLayout } from "../components/site/SiteLayout"

const StyledSectionContainer = styled.div<{
  bright: boolean
}>`
  width: 100%;
  height: 50vh;
  display: flex;
  padding: 8rem;
  align-items: center;
  ${(v) =>
    v.bright
      ? css`
          background-color: #f8f8f8;
        `
      : css`
          background-color: #eeeeee;
        `}
  gap: 8rem;

  div {
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    p {
      font-weight: lighter;
      font-size: 1.4rem;
      line-height: 1.75rem;
    }
  }
`

const Heading = () => (
  <SiteHeading>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
    odio. Maecenas cursus varius lorem
  </SiteHeading>
)

const Section1 = () => (
  <StyledSectionContainer bright={false}>
    <div>
      <h1>Lorem ipsum dolor sit amet,</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
        odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius lorem
      </p>
    </div>
    <PhoneIllustration1 color={"#ff8b01"} />
  </StyledSectionContainer>
)

const Section2 = () => (
  <StyledSectionContainer bright={true}>
    <PhoneIllustration2 color={"#ff8b01"} />
    <div>
      <h1>Lorem ipsum dolor sit amet,</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
        odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius lorem
      </p>
    </div>
  </StyledSectionContainer>
)

const Section3 = () => (
  <StyledSectionContainer bright={false}>
    <div>
      <h1>Lorem ipsum dolor sit amet,</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
        odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius lorem
      </p>
    </div>
    <PhoneIllustration3 color={"#ff8b01"} />
  </StyledSectionContainer>
)

const Section4 = () => (
  <StyledSectionContainer bright={true}>
    <PhoneIllustration4 color={"#ff8b01"} />
    <div>
      <h1>Lorem ipsum dolor sit amet,</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
        odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius lorem
      </p>
    </div>
  </StyledSectionContainer>
)

const Section5 = () => (
  <StyledSectionContainer bright={false}>
    <div>
      <h1>Lorem ipsum dolor sit amet,</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
        odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius lorem
      </p>
    </div>
    <PhoneIllustration5 color={"#ff8b01"} />
  </StyledSectionContainer>
)

const HomePage: BlitzPage = () => (
  <>
    <Heading />
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <Section5 />
    <ContactForm light={true} />
  </>
)

HomePage.getLayout = (page: ReactNode) => <SiteLayout title="Menudget - Home">{page}</SiteLayout>

// TEMP
export const getServerSideProps = () => ({
  redirect: { destination: Routes.LoginPage().href, permanent: false },
})

export default HomePage
