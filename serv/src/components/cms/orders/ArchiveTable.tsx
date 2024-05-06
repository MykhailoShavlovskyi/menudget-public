import { ReactNode } from "react"
import styled, { css } from "styled-components"
import { Input } from "../common/input/Input"
import { ArchiveOrder, OrderPick } from "../../../db/orders/orders"
import {
  getMsgDate,
  getMsgOrdersNumber,
  getMsgTable,
  getMsgTotal,
  getMsgWaiter,
  getPlhSearchOrder,
} from "../../../messages/orders"
import { semiboldP3 } from "../layout/CmsLayout"
import Link from "next/link"
import { replaceParam } from "../../../lib/location"
import { useRouter } from "next/router"

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  padding: 1.875rem 1.25rem;
  flex-direction: column;
  gap: 1.875rem;
  border-radius: 0.625rem;
  background: white;
  overflow-y: hidden;
  position: relative;

  & > div:nth-child(2) {
    padding-right: 1rem;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-spacing: 0;
  }

  th {
    width: 25%;
    padding: 0 0.625rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;

    :first-child {
      text-align: left;
      width: 12.5%;
    }
    :last-child {
      text-align: right;
      width: 12.5%;
    }
  }

  tr:first-child > td {
    height: 1.875rem;
    width: 0;
  }
  tbody > tr:not(:first-child) {
    :nth-child(even) {
      background: #f5f5f5;
    }
  }
  tbody > tr {
    cursor: pointer;
  }

  td {
    width: 25%;
    padding: 0.9375rem 0.625rem;
    text-align: center;
    color: black;
    font-size: 1.375rem;
    font-weight: 400;
    line-height: 1.875rem;

    :first-child {
      text-align: left;
      width: 12.5%;
      border-radius: 0.625rem 0 0 0.625rem;
    }
    :last-child {
      text-align: right;
      width: 12.5%;
      border-radius: 0 0.625rem 0.625rem 0;
    }
  }
`

const StyledPagination = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  margin-top: 1.25rem;
  margin-right: 2.25rem;

  span {
    margin: 0 0.5rem;
  }
`

const StyledNextPrev = styled.div<{ disabled?: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${(v) => v.theme.colors.secondary.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;

  ${(v) =>
    !v.disabled &&
    css`
      :hover {
        background-color: #e5e4e4;
      }
    `}

  ${(v) =>
    v.disabled &&
    css`
      opacity: 0.4;
    `}
`

const StyledNoItemsPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  height: calc(100% - 12.2rem);
  width: calc(100% - 2.5rem);
  position: absolute;

  border-radius: 1rem;
  border: 2px dashed gray;

  ${semiboldP3}
`

export const ArchiveTable = ({
  items,
  page,
  canGoPrev,
  canGoNext,
  onPageChange,
}: {
  items: ReactNode[]
  page: number
  canGoPrev: boolean
  canGoNext: boolean
  onPageChange: () => void
}) => {
  const router = useRouter()
  return (
    <StyledContainer>
      <Input
        placeholder={getPlhSearchOrder()}
        onChange={(e) => {
          let uri = replaceParam("search", e.target.value)
          uri = replaceParam("page", 1, uri)
          void router.replace(uri, undefined, { scroll: false })
          onPageChange()
        }}
      />

      <div>
        <table>
          <thead>
            <tr>
              <th>{getMsgOrdersNumber()}</th>
              <th>{getMsgTable()}</th>
              <th>{getMsgDate()}</th>
              <th>{getMsgWaiter()}</th>
              <th>{getMsgTotal()}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td />
            </tr>
            {items}
          </tbody>
        </table>

        <StyledPagination>
          {canGoPrev ? (
            <Link href={replaceParam("page", page - 1)} onClick={onPageChange}>
              <StyledNextPrev disabled={false}>-</StyledNextPrev>
            </Link>
          ) : (
            <StyledNextPrev disabled={true}>-</StyledNextPrev>
          )}
          <span>{page}</span>
          {canGoNext ? (
            <Link href={replaceParam("page", page + 1)} onClick={onPageChange}>
              <StyledNextPrev disabled={false}>+</StyledNextPrev>
            </Link>
          ) : (
            <StyledNextPrev disabled={true}>-</StyledNextPrev>
          )}
        </StyledPagination>

        {items.length == 0 && (
          <StyledNoItemsPlaceholder>No orders in the archive</StyledNoItemsPlaceholder>
        )}
      </div>
    </StyledContainer>
  )
}

export const ArchiveTableItem = ({ onClick, ...order }: ArchiveOrder & { onClick: () => void }) => {
  const date = new Date(order.createdAt)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`
  const total = order.dishes.map((v) => v.total).reduce((p, c) => p + c, 0)

  return (
    <tr onClick={onClick}>
      <td>#{order.id}</td>
      <td>{order.table}</td>
      <td>{formattedDate}</td>
      <td>{order.waiterName}</td>
      <td>${total}</td>
    </tr>
  )
}
