import styled from "styled-components"
import React, { ReactNode } from "react"

const StyledGrid = styled.div<{
  full?: boolean
  asideWidth?: number
}>`
  height: calc(100vh - 6.34rem);
  display: grid;
  grid-template-columns: ${(v) =>
    v.full ? "inherit;" : `${v.asideWidth ?? 34.875}rem auto;`}; // 30rem auto;

  background: var(--secondary-ultra-light-grey, #f5f5f5);
`

export const Grid = ({
  id,
  asideWidth,
  aside,
  main,
}: {
  id?: string
  asideWidth?: number
  aside?: ReactNode
  main?: ReactNode
}) => (
  <StyledGrid id={id} full={aside == null} asideWidth={asideWidth}>
    {aside}
    {main}
  </StyledGrid>
)
