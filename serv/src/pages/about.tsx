import { BlitzPage, Routes } from "@blitzjs/next"
import React, { ReactNode } from "react"
import { SiteHeading } from "../components/site/SiteHeading"
import styled from "styled-components"
import Image from "next/image"
import { SiteLayout } from "../components/site/SiteLayout"

const Heading = () => <SiteHeading>About us</SiteHeading>

const StyledAboutUs = styled.div`
  display: flex;
  padding: 8rem;
  background-color: #eeeeee;
  gap: 6rem;
  img {
    //flex: 1;
  }

  p {
    margin-top: 0;
    font-size: 1.4rem;
    font-weight: lighter;
    flex: 0.75;
  }
`

const AboutUs = () => (
  <StyledAboutUs>
    <Image src={"/team.png"} alt={"team"} width={1200 / 2} height={675 / 2} />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
      odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius lorem Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie odio. Maecenas cursus
      varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla,
      ut molestie odio. Maecenas cursus varius lorem cursus varius lorem Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Cras in lobortis nulla, ut molestie odio. Maecenas cursus varius
      lorem Lorem ipsum dolor sit amet, consectetur adipiscing ecursus varius lorem Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie odio.
      Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur adipiscing e
    </p>
  </StyledAboutUs>
)

const AboutPage: BlitzPage = () => (
  <>
    <Heading />
    <AboutUs />
  </>
)

AboutPage.getLayout = (page: ReactNode) => <SiteLayout title="Menudget - About">{page}</SiteLayout>

// TEMP
export const getServerSideProps = () => ({
  redirect: { destination: Routes.LoginPage().href, permanent: false },
})

export default AboutPage
