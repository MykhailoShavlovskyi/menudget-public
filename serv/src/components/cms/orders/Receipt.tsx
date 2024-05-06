import { ArchiveOrder } from "../../../db/orders/orders"
import styled from "styled-components"
import { CloseButton } from "../common/CloseButton"
import { SmallCircleIcon } from "../icons/SmallCircleIcon"
import React from "react"

const StyledContainer = styled.div`
  display: flex;
  width: 34.875rem;
  padding: 1.875rem 2.125rem;
  flex-direction: column;
`

const StyledHeader = styled.h1`
  margin: 0 0 1.25rem;
  display: flex;
  width: 100%;
  justify-content: space-between;

  color: ${(v) => v.theme.colors.primary.black};
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.375rem;
`

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.625rem;
  margin-bottom: 1.875rem;
  & > div {
    display: flex;
    align-items: center;
  }

  color: #828282;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
`

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.625rem;
  flex-grow: 1;

  li {
    display: flex;

    text-indent: 0;
    list-style-type: none;
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.875rem;

    span:nth-child(1) {
      flex-grow: 1;
    }

    span:nth-child(2) {
      color: #ff7a00;
    }
    span:nth-child(3) {
      width: 5.625rem;
      text-align: end;
    }
  }
`

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-top: 0.625rem;

  border-top: 1px solid #b6b6b6;

  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.875rem;
`

export const Receipt = ({ order, onClose }: { order?: ArchiveOrder; onClose: () => void }) => {
  if (order == null) return null
  const date = new Date(order.createdAt)
  const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(
    -2
  )}/${date.getFullYear()}, ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(
    -2
  )}`

  return (
    <StyledContainer>
      {/*Header*/}
      <StyledHeader id={"form-header"}>
        Order #{order.id}
        <CloseButton onClick={onClose} />
      </StyledHeader>

      {/*Info*/}
      <StyledInfo>
        <div>
          <span>{order.table}</span>
          {order.waiterName !== "-" && (
            <>
              <SmallCircleIcon color={"#828282"} />
              <span>{order.waiterName}</span>
            </>
          )}
        </div>
        <span>{formattedDate}</span>
      </StyledInfo>

      {/*List*/}
      <StyledList>
        {order.dishes.map((v, i) => (
          <li key={v.name}>
            <span>
              {i + 1}. {v.name}
            </span>
            <span>x{v.count}</span>
            <span>{v.total}$</span>
          </li>
        ))}
      </StyledList>

      {/*Footer*/}
      <StyledFooter>
        <span>Total</span>
        <span>{order.dishes.map((v) => v.total).reduce((n, c) => n + c, 0)}$</span>
      </StyledFooter>
    </StyledContainer>
  )
}
