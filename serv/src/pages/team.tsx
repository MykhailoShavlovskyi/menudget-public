import { BlitzPage, Routes } from "@blitzjs/next"
import React, { ReactNode } from "react"
import { SiteHeading } from "../components/site/SiteHeading"
import styled from "styled-components"
import Image from "next/image"
import { SiteLayout } from "../components/site/SiteLayout"

const Heading = () => <SiteHeading>Menudget team</SiteHeading>

const StyledTeam = styled.div`
  display: flex;
  padding: 4rem 8rem;
  background-color: #eeeeee;

  display: flex;
  justify-content: center;
  gap: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 0.5rem;
    }

    h3 {
      margin: 0.5rem;
      font-weight: normal;
    }

    span {
      color: #6c6c6c;
      font-weight: lighter;
    }
  }
`

const Team = () => {
  return (
    <StyledTeam>
      <div>
        <Image src={"/daniil.png"} alt={"Daniil"} width={250} height={250} />
        <h3>Daniil Negovelov</h3>
        <span>CEO</span>
      </div>
      <div>
        <Image src={"/daniil.png"} alt={"Daniil"} width={250} height={250} />
        <h3>Daniil Negovelov</h3>
        <span>CEO</span>
      </div>
      <div>
        <Image
          src={"/daniil.png"}
          alt={"Daniil"}
          width={250}
          height={250}
          style={{ transform: "scaleX(-1)" }}
        />
        <h3>Daniil Negovelov</h3>
        <span>CEO</span>
      </div>
      <div>
        <Image
          src={"/daniil.png"}
          alt={"Daniil"}
          width={250}
          height={250}
          style={{ transform: "scaleX(-1)" }}
        />
        <h3>Daniil Negovelov</h3>
        <span>CEO</span>
      </div>
    </StyledTeam>
  )
}

const TeamPage: BlitzPage = () => (
  <>
    <Heading />
    <Team />
  </>
)

TeamPage.getLayout = (page: ReactNode) => <SiteLayout title="Menudget - Team">{page}</SiteLayout>

// TEMP
export const getServerSideProps = () => ({
  redirect: { destination: Routes.LoginPage().href, permanent: false },
})

export default TeamPage
