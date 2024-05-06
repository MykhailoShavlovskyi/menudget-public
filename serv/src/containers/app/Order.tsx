import {
  NotesInput as NotesInputBase,
  Order as OrderBase,
  OrderButton as OrderButtonBase,
  PromoInput as PromoInputBase,
  TableInput as TableInputBase,
} from "../../components/app/order/Order"
import {
  useNotFinalizedOrderDishes,
  useOrderedDishes,
  useOrderNotes,
  useOrderOpen,
  useOrderPromo,
  useOrderTableId,
  useOrderTableName,
  useOrderTotal,
  useRestaurantCurrency,
  useRestaurantId,
} from "../../store/app/selectors"
import {
  finalizeOrder,
  removeOrderedDish,
  setOrderNotes,
  setOrderOpen,
  setOrderPromo,
  setSelectedDish,
} from "../../store/app/slice"
import { DishEntry } from "../../components/app/shared/DishEntry"
import { useMutation } from "@blitzjs/rpc"
import submitOrder from "../../db/orders/mutations/submitOrder"
import React from "react"

const Dishes = () => (
  <>
    {useOrderedDishes().map((v) => (
      <DishEntry
        key={v.id}
        count={v.count}
        thumbnailUrl={v.thumbnailUrl}
        name={v.name}
        price={v.price}
        deleteDisabled={v.finalized}
        onClick={() => setSelectedDish(v.id)}
        onDelete={() => removeOrderedDish(v.id)}
      />
    ))}
  </>
)

const TableInput = () => <TableInputBase value={useOrderTableName() ?? ""} />

const NotesInput = () => (
  <NotesInputBase value={useOrderTableName() ?? ""} onChange={setOrderNotes} />
)

const PromoInput = () => <PromoInputBase value={useOrderPromo() ?? ""} onChange={setOrderPromo} />

const Total = () => <>{Number(useOrderTotal()).toFixed(2)}</>

const OrderButton = () => {
  const restaurantId = useRestaurantId()
  const tableId = useOrderTableId()
  const dishes = useOrderedDishes()
  const notFinalizedDishes = useNotFinalizedOrderDishes()
  const notes = useOrderNotes()
  const promo = useOrderPromo()
  const cantOrder = !dishes.some((v) => !v.finalized)

  const [submitOrderMutation] = useMutation(submitOrder)
  const order = () => {
    if (restaurantId == null || tableId == null) return

    void submitOrderMutation({
      restaurantId,
      dishes: notFinalizedDishes.map(({ id, count }) => ({ dishId: id, count })),
      tableId,
      notes,
      promo,
    })
    finalizeOrder()
  }

  return <OrderButtonBase disabled={cantOrder} onOrder={order} />
}

export const Order = () => (
  <OrderBase
    open={useOrderOpen()}
    currency={useRestaurantCurrency()}
    onClose={() => setOrderOpen(false)}
    dishes={<Dishes />}
    tableInput={<TableInput />}
    notesInput={<NotesInput />}
    promoInput={<PromoInput />}
    total={<Total />}
    orderButton={<OrderButton />}
  />
)
