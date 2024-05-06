import { OrderPick } from "../../../db/orders/orders"
import { OrderCard } from "./OrderCard"
import { OrdersGrid } from "./OrdersGrid"
import { OrderState } from "../../../definitions/OrderState"
import { OrderTables } from "./OrderTables"
import { groupBy, noop } from "lodash"
import { CompanySelect } from "../shared/CompanySelect"
import React, { useCallback, useState } from "react"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import { Button } from "../common/input/Button"
import styled from "styled-components"
import { ArchiveIcon } from "../icons/ArchiveIcon"
import { EditNoteModal } from "./EditNoteModal"
import { aws } from "@aws-sdk/util-endpoints/dist-types/lib"
import { Modal } from "../common/modal/Modal"
import { EditOrderModal } from "./EditOrderModal"
import { DishSelectDish } from "../../../db/dishes/dishes"
import { number } from "zod"
import { addAlert } from "../Alerts"

const StyledArchiveButton = styled(Button)`
  display: flex;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.3125rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.625rem;

  svg {
    cursor: pointer;
  }
`

const Card = ({
  id,
  onPayedChange,
  onDeliveredChange,
  onOpenNote,
  onMoveToArchive,
  onSetEdited,
  onCancel,
  onDelete,
  ...rest
}: OrderPick & {
  onPayedChange: (id: number, payed: boolean) => void
  onDeliveredChange?: (id: number, delivred: boolean) => void
  onOpenNote: (id: number) => void
  onMoveToArchive?: (id: number) => void
  onSetEdited: (id: number) => void
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}) => (
  <OrderCard
    id={id}
    onPayedChange={(v) => onPayedChange(id, v)}
    onDeliveredChange={(v) => onDeliveredChange && onDeliveredChange(id, v)}
    onOpenNote={() => onOpenNote(id)}
    onMoveToArchive={() => onMoveToArchive && onMoveToArchive(id)}
    onSetEdited={() => onSetEdited(id)}
    onCancel={() => onCancel(id)}
    onDelete={() => onDelete(id)}
    {...rest}
  />
)

const Cards = ({
  orders,
  onPayedChange,
  onDeliveredChange,
  onOpenNote,
  onMoveToArchive,
  onSetEdited,
  onCancel,
  onDelete,
}: {
  orders: OrderPick[]
  onPayedChange: (id: number, payed: boolean) => void
  onDeliveredChange?: (id: number, delivered: boolean) => void
  onOpenNote: (id: number) => void
  onMoveToArchive?: (id: number) => void
  onSetEdited: (id: number) => void
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}) => (
  <>
    {orders
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((order) => (
        <Card
          key={order.id}
          {...order}
          onPayedChange={onPayedChange}
          onDeliveredChange={onDeliveredChange}
          onOpenNote={onOpenNote}
          onMoveToArchive={onMoveToArchive}
          onSetEdited={onSetEdited}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
  </>
)

const PendingOrderCards = ({
  restaurants,
  restaurantId,
  orders,
  onSelectRestaurant,
  onStateChange,
  onPayedChange,
  onSetEdited,
  onOpenNote,
  onCancel,
  onDelete,
}: {
  restaurantId?: number
  restaurants?: RestaurantIndex[]
  orders: OrderPick[]
  onSelectRestaurant: (v: number) => void
  onStateChange: (id: number, state: string) => void
  onPayedChange: (id: number, payed: boolean) => void
  onOpenNote: (id: number) => void
  onSetEdited: (id: number) => void
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}) => (
  <OrdersGrid
    id={"pending-orders"}
    state={OrderState.Pending}
    onStateChange={(id) => onStateChange(id, OrderState.Pending)}
    afterHeader={
      restaurants && (
        <CompanySelect
          restaurants={restaurants}
          value={restaurantId}
          onChange={onSelectRestaurant}
        />
      )
    }
  >
    <Cards
      orders={orders}
      onPayedChange={onPayedChange}
      onOpenNote={onOpenNote}
      onSetEdited={onSetEdited}
      onCancel={onCancel}
      onDelete={onDelete}
    />
  </OrdersGrid>
)

const InProgressOrderCards = ({
  orders,
  onStateChange,
  onPayedChange,
  onOpenNote,
  onSetEdited,
  onCancel,
  onDelete,
}: {
  orders: OrderPick[]
  onStateChange: (id: number, state: string) => void
  onPayedChange: (id: number, payed: boolean) => void
  onOpenNote: (id: number) => void
  onSetEdited: (id: number) => void
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}) => (
  <OrdersGrid
    id={"in-progress-orders"}
    state={OrderState.InProgress}
    onStateChange={(id) => onStateChange(id, OrderState.InProgress)}
  >
    <Cards
      orders={orders}
      onPayedChange={onPayedChange}
      onOpenNote={onOpenNote}
      onSetEdited={onSetEdited}
      onCancel={onCancel}
      onDelete={onDelete}
    />
  </OrdersGrid>
)

const DoneOrderCards = ({
  orders,
  onOpenArchive,
  onStateChange,
  onPayedChange,
  onDeliveredChange,
  onOpenNote,
  onMoveToArchive,
  onSetEdited,
  onCancel,
  onDelete,
}: {
  orders: OrderPick[]
  onOpenArchive: () => void
  onStateChange: (id: number, state: string) => void
  onPayedChange: (id: number, payed: boolean) => void
  onDeliveredChange: (id: number, delivered: boolean) => void
  onOpenNote: (id: number) => void
  onMoveToArchive: (id: number) => void
  onSetEdited: (id: number) => void
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}) => (
  <OrdersGrid
    id={"done-orders"}
    state={OrderState.Done}
    onStateChange={(id) => onStateChange(id, OrderState.Done)}
    afterHeader={
      <StyledArchiveButton primary={true} label={<ArchiveIcon />} onClick={onOpenArchive} />
    }
  >
    <Cards
      orders={orders}
      onPayedChange={onPayedChange}
      onDeliveredChange={onDeliveredChange}
      onOpenNote={onOpenNote}
      onMoveToArchive={onMoveToArchive}
      onSetEdited={onSetEdited}
      onCancel={onCancel}
      onDelete={onDelete}
    />
  </OrdersGrid>
)

export const OrderCards = ({
  restaurantId,
  restaurants,
  orders,
  dishes,
  currency,
  onSelectRestaurant,
  onOpenArchive,
  onStateChange,
  onPayedChange,
  onDeliveredChange,
  onOrderChanged,
  onNotesChange,
  onCancel,
  onDelete,
}: {
  restaurantId?: number
  restaurants?: RestaurantIndex[]
  orders: OrderPick[]
  dishes: DishSelectDish[]
  currency?: string
  onSelectRestaurant: (v: number) => void
  onOpenArchive: () => void
  onStateChange: (id: number, state: string) => void
  onPayedChange: (id: number, payed: boolean) => void
  onDeliveredChange: (id: number, delivered: boolean) => void
  onOrderChanged: (
    id: number,
    dishes: { id: number; count: number }[],
    notes: string
  ) => Promise<any>
  onNotesChange: (id: number, note: string) => Promise<any>
  onCancel: (id: number) => void
  onDelete: (id: number) => void
}) => {
  const grouped = groupBy(orders, (v) => v.state)

  const [editedNoteId, setEditedNoteId] = useState<number | null>(null)
  const [editedOrderId, setEditedOrderId] = useState<number | null>(null)
  const [canceledOrderId, setCanceledOrderId] = useState<number | null>(null)
  const [deletedOrderId, setDeletedOrderId] = useState<number | null>(null)

  return (
    <>
      <OrderTables>
        <PendingOrderCards
          restaurantId={restaurantId}
          restaurants={restaurants}
          orders={grouped[OrderState.Pending] ?? []}
          onSelectRestaurant={onSelectRestaurant}
          onStateChange={onStateChange}
          onPayedChange={onPayedChange}
          onOpenNote={setEditedNoteId}
          onSetEdited={setEditedOrderId}
          onCancel={setCanceledOrderId}
          onDelete={setDeletedOrderId}
        />
        <InProgressOrderCards
          orders={grouped[OrderState.InProgress] ?? []}
          onStateChange={onStateChange}
          onPayedChange={onPayedChange}
          onOpenNote={setEditedNoteId}
          onSetEdited={setEditedOrderId}
          onCancel={setCanceledOrderId}
          onDelete={setDeletedOrderId}
        />
        <DoneOrderCards
          orders={grouped[OrderState.Done] ?? []}
          onOpenArchive={onOpenArchive}
          onStateChange={onStateChange}
          onPayedChange={onPayedChange}
          onDeliveredChange={onDeliveredChange}
          onOpenNote={setEditedNoteId}
          onMoveToArchive={(id) => onStateChange(id, OrderState.Archived)}
          onSetEdited={setEditedOrderId}
          onCancel={setCanceledOrderId}
          onDelete={setDeletedOrderId}
        />
        {editedNoteId != null && (
          <EditNoteModal
            initialValue={orders.find((v) => v.id === editedNoteId)?.notes ?? ""}
            open={true}
            onClose={() => setEditedNoteId(null)}
            onSave={async (v) => {
              if (editedNoteId == null) return
              await onNotesChange(editedNoteId, v)
              setEditedNoteId(null)
            }}
          />
        )}
        <EditOrderModal
          open={editedOrderId != null}
          notes={orders.find((v) => v.id === editedOrderId)?.notes ?? ""}
          currency={currency}
          dishes={orders.find((v) => v.id === editedOrderId)?.dishes ?? []}
          allDishes={dishes}
          onSave={async (dishes, notes) => {
            if (editedOrderId == null) return
            await onOrderChanged(editedOrderId, dishes, notes)
            setEditedOrderId(null)
            addAlert("Order updated successfully")
          }}
          onClose={() => setEditedOrderId(null)}
        />
      </OrderTables>

      <Modal
        isOpen={canceledOrderId != null}
        header={`Are you sure you to cancel #${orders.find((v) => v.id === canceledOrderId)?.id}?`}
        footer={
          <>
            <Button id={"cancel-btn"} label={"cancel"} onClick={() => setCanceledOrderId(null)} />
            <Button
              primary={true}
              label={"yes"}
              onClick={() => {
                canceledOrderId != null && onCancel(canceledOrderId)
                setCanceledOrderId(null)
              }}
            />
          </>
        }
      />

      <Modal
        isOpen={deletedOrderId != null}
        header={`Are you sure you to delete #${orders.find((v) => v.id === deletedOrderId)?.id}?`}
        footer={
          <>
            <Button id={"cancel-btn"} label={"cancel"} onClick={() => setDeletedOrderId(null)} />
            <Button
              primary={true}
              label={"yes"}
              onClick={() => {
                deletedOrderId != null && onDelete(deletedOrderId)
                setDeletedOrderId(null)
              }}
            />
          </>
        }
      />
    </>
  )
}
