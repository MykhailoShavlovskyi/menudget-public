import styled from "styled-components"
import React, { ReactNode } from "react"

const StyledContainer = styled.main`
  height: calc(100vh - 6.34rem);
  padding: 1.875rem 2.13rem 0;
  overflow-x: hidden;
  overflow-y: auto;
`

const StyledGrid = styled.div<{
  width?: number
  height?: number
}>`
  display: grid;

  /* Cards will be at least {width}rem wide, but expand to fill the available space */
  grid-template-columns: repeat(auto-fill, minmax(${(v) => v.width}rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(${(v) => v.height}rem, 1fr));

  gap: 1rem;
  align-items: center;
  padding-bottom: 2rem;
`

export const CardsGrid = ({
  width = 23.125,
  height = 15,
  heading,
  cards,
}: {
  width?: number
  height?: number
  heading?: ReactNode
  cards?: ReactNode
}) => (
  <StyledContainer>
    {heading}
    <StyledGrid width={width} height={height}>
      {cards}
    </StyledGrid>
  </StyledContainer>
)
