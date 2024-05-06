import styled from "styled-components"
import { ReactNode } from "react"
import Layout from "../../common/Layout"
import Image from "next/image"
import { MenudgetLogo } from "../MenudgetLogo"

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;

  main {
    display: flex;
    width: 100%;
    max-width: 150rem;

    & > div:first-child {
      position: relative;
      display: flex;
      flex:1;

      justify-content: center;
      align-items: center;

      img{
        z-index: -1;
        filter: brightness(0.4);
      }
  }
`

export const AuthLayout = ({ title, form }: { title?: string; form: ReactNode }) => (
  <Layout title={title}>
    <StyledContainer>
      <main>
        <div>
          <Image
            src={"/cms/login-banner1.png"}
            alt={"banner"}
            fill={true}
            style={{ objectFit: "cover" }}
          />
          <MenudgetLogo />
        </div>
        {form}
      </main>
    </StyledContainer>
  </Layout>
)
