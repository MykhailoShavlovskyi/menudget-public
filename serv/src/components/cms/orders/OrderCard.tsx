import { useDrag } from "react-dnd"
import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import { OrderPick } from "../../../db/orders/orders"
import { OrderState } from "../../../definitions/OrderState"
import { SmallCircleIcon } from "../icons/SmallCircleIcon"
import { DollarIcon } from "../icons/DollarIcon"
import { Button } from "../common/input/Button"
import { MoreIcon } from "../icons/MoreIcon"
import { CutleryIcon } from "../icons/CutleryIcon"
import { SmallArchiveIcon } from "../icons/SmallArchiveIcon"
import { ContextMenu, ContextMenuItem } from "../common/ContextMenu"
import { PencilIcon } from "../icons/PencilIcon"
import { SmallCrossIcon } from "../icons/SmallCrossIcon"
import { TrashIcon } from "../icons/TrashIcon"
import {
  getLblCancelOrder,
  getLblDeleteOrder,
  getLblEditOrder,
  getMsgMoveToArchive,
  getMsgNote,
} from "../../../messages/orders"

const StyledCard = styled.div<{ state: string }>`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  cursor: grab;
  border-radius: 0.625rem;
  ${(v) =>
    v.state === OrderState.Pending &&
    css`
      border-left: 4px solid #52beff;
      background: #e3f3ff;
    `}
  ${(v) =>
    v.state === OrderState.InProgress &&
    css`
      border-left: 4px solid #ff7a00;
      background: #fff2dd;
    `}
  ${(v) =>
    v.state === OrderState.Done &&
    css`
      border-left: 4px solid #3cb367;
      background: #e5f7e6;
    `}
`

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  gap: 1.25rem;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-grow: 1;

    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.875rem;
  }
`
const StyledButton = styled(Button)<{ enabled: boolean }>`
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  justify-content: center;
  align-items: center;

  border-radius: 0.625rem;
  background: ${(v) => (v.enabled ? "#3cb367" : "#F5F5F5")};
`

const StyledNote = styled.div`
  width: 100%;
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  gap: 0.125rem;

  cursor: pointer;
  border-radius: 0.625rem;
  background: #fff;

  h4 {
    margin: 0;
    color: #52beff;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.125rem;
  }
`

const StyledArchiveButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.375rem;
  line-height: 1.875rem;
`

const StyledList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  li {
    display: flex;
    justify-content: space-between;
  }
`

export const OrderCard = ({
  id,
  createdAt,
  table,
  state,
  notes,
  payed,
  delivered,
  dishes,
  onPayedChange,
  onDeliveredChange,
  onOpenNote,
  onMoveToArchive,
  onSetEdited,
  onCancel,
  onDelete,
}: OrderPick & {
  onPayedChange: (payed: boolean) => void
  onDeliveredChange?: (delivered: boolean) => void
  onOpenNote: () => void
  onMoveToArchive?: () => void
  onSetEdited: () => void
  onCancel: () => void
  onDelete: () => void
}) => {
  const date = new Date(createdAt)

  // Use drag
  const [collected, drag, dragPreview] = useDrag<
    unknown,
    unknown,
    {
      isDragging: boolean
    }
  >(() => ({
    type: "order",
    item: { id, state },
  }))

  // Handle state change
  const handlePayedToggle = useCallback(() => onPayedChange(!payed), [onPayedChange])
  const handleDeliveredToggle = useCallback(
    () => onDeliveredChange && onDeliveredChange(!delivered),
    [onPayedChange]
  )

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <StyledCard id={id.toString()} ref={drag} state={state} {...collected}>
      {/*Header*/}
      <StyledHeader>
        <div>
          <span>{table}</span>
          <SmallCircleIcon />
          <span>
            {String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}
          </span>
        </div>
        <StyledButton
          label={<DollarIcon color={!payed ? "#828282" : "white"} />}
          enabled={payed}
          onClick={handlePayedToggle}
        />
        {state == OrderState.Done && (
          <StyledButton
            label={<CutleryIcon color={!delivered ? "#828282" : "white"} />}
            enabled={delivered}
            onClick={handleDeliveredToggle}
          />
        )}
        <ContextMenu
          firstGroup={
            <>
              <ContextMenuItem
                label={getLblEditOrder()}
                overColor={"black"}
                Icon={PencilIcon}
                onClick={onSetEdited}
              />
              <ContextMenuItem
                label={getLblCancelOrder()}
                overColor={"black"}
                Icon={SmallCrossIcon}
                onClick={onCancel}
              />
            </>
          }
          secondGroup={
            <ContextMenuItem
              label={getLblDeleteOrder()}
              overColor={"#FF0000"}
              Icon={TrashIcon}
              onClick={onDelete}
            />
          }
        />
      </StyledHeader>

      {/*Note*/}
      {notes && (
        <StyledNote onClick={onOpenNote}>
          <h4>{getMsgNote()}</h4>
          <p>{notes}</p>
        </StyledNote>
      )}

      {/*Dish list*/}
      <StyledList>
        {dishes.map(({ count, name }) => (
          <li key={name}>
            <span>{name}</span>
            <span>{count}</span>
          </li>
        ))}
      </StyledList>

      {state === OrderState.Done && (
        <StyledArchiveButton
          disabled={!delivered || !payed}
          label={
            <>
              <SmallArchiveIcon color={!delivered || !payed ? "#B6B6B6" : "white"} />
              {getMsgMoveToArchive()}
            </>
          }
          onClick={onMoveToArchive}
        />
      )}
    </StyledCard>
  )
}
