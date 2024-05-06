import styled from "styled-components"
import Image from "next/image"
import React from "react"
import Link from "next/link"

const StyledFooter = styled.div`
  display: flex;
  padding: 2rem 8rem;
  gap: 8rem;

  border-top: 6px solid #ff8b01;

  justify-content: space-between;
  background-color: #2c354d;

  h4 {
    font-size: 18px;
    font-weight: normal;
    color: #ff8b01;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
  }

  div {
    flex: 1;
    display: flex;
    justify-content: flex-start;

    a {
      color: #6c6c6c;
      margin-bottom: 0.25rem;
    }
  }

  .links {
    flex-direction: column;
    flex: 0.4;
  }

  .paragraph {
    flex-direction: column;
    color: white;
    font-size: 20px;
    font-weight: lighter;
  }

  .logo {
    margin-top: 1.3rem;
    flex: 0.6;
    // justify-content: center;
  }
`

export const SiteFooter = () => (
  <StyledFooter>
    <div className={"links"}>
      <h4>Back To Top</h4>
      <h4>Pages</h4>
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/team"}>Team</Link>
      <Link href={"/contact"}>Contact</Link>
      <Link href={"/cms"}>CMS</Link>
      <Link href={"/docs"}>Docs</Link>
      <h4>Legal</h4>
      <Link href={"/privacy-policy"}>Privacy Policy</Link>
    </div>
    <div className={"paragraph"}>
      <h4>Lorem ipsum</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in lobortis nulla, ut molestie
        odio. Maecenas cursus varius lorem Lorem ipsum dolor sit amet, consectetur
      </p>
    </div>
    <div className={"logo"}>
      <Image src={"/logo.png"} alt={"ds"} width={1551 / 5} height={441 / 5} />
    </div>
  </StyledFooter>
)
