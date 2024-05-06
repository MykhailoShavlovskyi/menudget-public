import { CardProps } from "../common/card/Card"
import React from "react"
import styled, { css } from "styled-components"
import { Button } from "../common/input/Button"
import { StyledCard } from "../common/card/Card"
import { DownloadIcon } from "../icons/DownloadIcon"
import { getLblShowQRCode, getMsgDownloadQRCode, getMsgOccupancy } from "../../../messages/tables"

const RestyledCard = styled(StyledCard)`
  display: flex;
  padding: 2.625rem 1.75rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;

  ${(v) =>
    v.selected &&
    css`
      padding: calc(2.625rem - 0.25rem) calc(1.75rem - 0.25rem);
    `}

  h1 {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.875rem;
  }
  span {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.375rem;
  }
  button {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`

const StyledDownloadButtonLabel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  svg {
    position: absolute;
    left: 0;
  }
`

const DownloadButtonLabel = () => (
  <StyledDownloadButtonLabel>
    <DownloadIcon />
    {getMsgDownloadQRCode()}
  </StyledDownloadButtonLabel>
)

export const TableCard = ({
  id,
  restaurantId,
  restaurantName,
  tableId,
  name,
  occupancy,
  onShowQr,
  onDownloadQr,
  ...rest
}: CardProps & {
  restaurantId: number
  restaurantName: string
  tableId: number
  name: string
  occupancy: string
  onShowQr: () => void
  onDownloadQr: () => void
}) => (
  <>
    <RestyledCard id={id?.toString()} {...rest}>
      <h1>{name}</h1>
      <span>
        {getMsgOccupancy()}
        {occupancy}
      </span>
      <Button
        label={getLblShowQRCode()}
        onClick={(e) => {
          e.stopPropagation()
          onShowQr()
        }}
      />
      <Button
        label={<DownloadButtonLabel />}
        onClick={(e) => {
          e.stopPropagation()
          onDownloadQr()
        }}
      />
    </RestyledCard>
  </>
)
