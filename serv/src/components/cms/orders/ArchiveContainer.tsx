import styled from "styled-components"
import { ReactNode } from "react"

const StyledContainer = styled.div`
  height: calc(100vh - 6.34rem);
  display: flex;
  padding: 1.875rem 2.125rem;
  flex-direction: column;
  gap: 1.875rem;
  background: #f5f5f5;
  flex-grow: 1;
`

const StyledFlex = styled.div`
  display: flex;
`

export const ArchiveContainer = ({
  heading,
  table,
  receipt,
}: {
  heading: ReactNode
  table?: ReactNode
  receipt?: ReactNode
}) => {
  if (receipt == null)
    return (
      <StyledContainer>
        {heading}
        {table}
      </StyledContainer>
    )

  return (
    <StyledFlex>
      <StyledContainer>
        {heading}
        {table}
      </StyledContainer>
      {receipt}
    </StyledFlex>
  )
}
