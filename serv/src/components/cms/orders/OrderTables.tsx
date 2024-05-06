import styled from "styled-components"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import React, { PropsWithChildren } from "react"

const StyledGrid = styled.div`
  display: grid;
  height: calc(100vh - 6.34rem);
  grid-template-columns: 1fr 1fr 1fr;
`

export const OrderTables = ({ children }: PropsWithChildren<{}>) => (
  <StyledGrid>
    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  </StyledGrid>
)
