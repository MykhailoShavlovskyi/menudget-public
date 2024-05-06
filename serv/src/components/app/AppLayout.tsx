import { PropsWithChildren, useState } from "react"
import Layout from "../common/Layout"
import styled, { createGlobalStyle } from "styled-components"
import { DesignScreen } from "./DesignScreen"
import { NavBar } from "../../containers/app/NavBar"
import { Dish } from "../../containers/app/Dish"
import { useMount } from "react-use"
import { Order } from "../../containers/app/Order"

const StyledBackground1 = styled.div`
  width: 100vw;
  height: calc((100vh - (844px)) * 0.5);
  top: 0;
  left: 0;
  position: fixed;
  background-color: #1c1c1c;

  @media (max-width: 767px) {
    width: 0;
    height: 0;
  }
`
const StyledBackground2 = styled.div`
  width: 100vw;
  height: calc((100vh - (844px)) * 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: #1c1c1c;

  @media (max-width: 767px) {
    width: 0;
    height: 0;
  }
`
const StyledBackground3 = styled.div`
  height: 100vh;
  width: calc((100vw - (390px)) * 0.5);
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #1c1c1c;

  @media (max-width: 767px) {
    width: 0;
    height: 0;
  }
`
const StyledBackground4 = styled.div`
  height: 100vh;
  width: calc((100vw - (390px)) * 0.5);
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #1c1c1c;

  @media (max-width: 767px) {
    width: 0;
    height: 0;
  }
`

const StyledFrameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  //background-color: white;
`

const StyledFrame = styled.div`
  background-color: white;

  width: calc(390px);
  height: calc(844px);
  @media (max-width: 767px) {
    width: 100vw;
    height: 100vh;
  }

  position: relative;
  overflow: hidden;
`

const StyledContentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Frame = ({ children }: PropsWithChildren<{}>) => (
  <>
    <StyledFrameContainer>
      <StyledFrame>{children}</StyledFrame>
    </StyledFrameContainer>
    <StyledBackground1 />
    <StyledBackground2 />
    <StyledBackground3 />
    <StyledBackground4 />
  </>
)

export const AppLayout = ({
  title,
  children,
}: PropsWithChildren<{
  title: string
}>) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  return (
    <Layout key={"app-layout"} title={title}>
      <GlobalStyle />
      <Frame>
        <StyledContentContainer id={"root"}>{children}</StyledContentContainer>
        {mounted && (
          <>
            <Order />
            <Dish />
          </>
        )}
        {false && <DesignScreen src={"/screens/order.png"} />}
        {false && <DesignScreen src={"/screens/menu.png"} />}
        {false && <DesignScreen src={"/screens/bookmarks.png"} />}
        {false && <DesignScreen src={"/screens/contact.png"} />}
        {false && <DesignScreen src={"/screens/filters1.png"} />}
        {false && <DesignScreen src={"/screens/filters2.png"} />}
        {false && <DesignScreen src={"/screens/dish.png"} />}
        {false && <DesignScreen src={"/screens/confirm-order.png"} />}
      </Frame>
      <NavBar />
    </Layout>
  )
}
