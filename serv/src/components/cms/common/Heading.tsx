import React, { PropsWithChildren } from "react"
import styled from "styled-components"

const StyledHeading = styled.h1`
  margin: 0 0 2.5rem;
  font-size: 2.25rem;
  line-height: 3.125rem;
  font-weight: 700;
`

export const Heading = (
  props: PropsWithChildren<{
    id?: string
  }>
) => <StyledHeading {...props} />
