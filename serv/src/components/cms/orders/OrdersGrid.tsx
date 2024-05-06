import React, { PropsWithChildren, ReactNode, useMemo } from "react"
import { useDrop } from "react-dnd"
import styled from "styled-components"
import { OrdersDropOverlay } from "./OrdersDropOverlay"
import { OrderState } from "../../../definitions/OrderState"
import { getHdrComplete, getHdrInProgress, getHdrPending } from "../../../messages/orders"

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  height: calc(100vh - 6.34rem);
  overflow: scroll;

  flex-direction: column;
  align-items: flex-start;
  gap: 1.375rem;
  align-self: stretch;
  background: #fff;

  :nth-child(1) {
    padding: 1.875rem 1.3125rem 1.875rem 2.125rem;
  }

  :nth-child(2) {
    padding: 1.875rem 1.25rem;
    border-right: 1px solid #b6b6b6;
    border-left: 1px solid #b6b6b6;
  }

  :nth-child(3) {
    padding: 1.375rem 2.125rem 1.375rem 1.3125rem;

    & > div:first-child {
      width: 100%;
      justify-content: space-between;
    }
  }
`

const StyledHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.875rem;

  h1 {
    margin: 0 1rem 0 0;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 3.125rem;
  }
`

export const OrdersGrid = ({
  id,
  state,
  onStateChange,
  children,
  afterHeader,
  ...rest
}: PropsWithChildren<{
  id?: string
  state: string
  onStateChange: (id: number) => void
  afterHeader?: ReactNode
}>) => {
  // Get header
  const header = useMemo(() => {
    switch (state) {
      case OrderState.Pending:
        return getHdrPending()
      case OrderState.InProgress:
        return getHdrInProgress()
      case OrderState.Done:
        return getHdrComplete()
    }
    return ""
  }, [state])

  // Use drop
  const [canDrop, ref] = useDrop<
    {
      id: number
      state: string
    },
    unknown,
    unknown
  >(() => ({
    accept: "order",
    collect: (m) =>
      m.canDrop() &&
      m.getItem<{
        state: string
      }>().state !== state,
    drop: (i) => onStateChange(i.id),
  }))

  return (
    <StyledContainer id={id} ref={ref} {...rest}>
      <>
        <StyledHeadingContainer>
          <h1>{header}</h1>
          {afterHeader}
        </StyledHeadingContainer>
        {children}
        {canDrop && <OrdersDropOverlay />}
      </>
    </StyledContainer>
  )
}
