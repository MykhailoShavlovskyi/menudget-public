import styled from "styled-components"
import { NoContent } from "./common/NoContent"
import { ReactNode } from "react"

const StyledContainer = styled.div`
  padding: 1.3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > h3 {
    letter-spacing: 0.4px;
    margin: 0 0 0.18rem;
    font-family: Avenir;
    font-weight: bolder;
    text-align: center;
  }

  & > h2 {
    letter-spacing: 0.4px;
    margin: 0;
    font-size: 1.6rem;
    font-family: Avenir;
    font-weight: bolder;
    margin-bottom: 1rem;
  }

  & > div {
    width: 100%;
  }
`

export const Bookmarks = ({
  restaurantName,
  noBookmarks,
  bookmarks,
}: {
  restaurantName: string
  noBookmarks: boolean
  bookmarks: ReactNode
}) => (
  <StyledContainer>
    <h3>Restaurant {restaurantName}</h3>
    <h2>Bookmarks</h2>
    {noBookmarks ? <NoContent label={"No dishes added to bookmarks"} /> : <div>{bookmarks}</div>}
  </StyledContainer>
)
