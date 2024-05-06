import { OrderCards as Cards } from "../../../components/cms/orders/OrderCards"
import { OrderPick } from "../../../db/orders/orders"
import { useMutation } from "@blitzjs/rpc"
import setOrderState from "../../../db/orders/mutations/setOrderState"
import setOrderPayed from "../../../db/orders/mutations/setOrderPayed"
import { useRefresh } from "../../../lib/useRefresh"
import { useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { RestaurantIndex } from "../../../db/restaurants/restaurants"
import setOrderDelivered from "../../../db/orders/mutations/setOrderDelivered"
import setOrderNotes from "../../../db/orders/mutations/setOrderNotes"
import deleteOrder from "../../../db/orders/mutations/deleteOrder"
import cancelOrder from "../../../db/orders/mutations/cancelOrder"
import { DishSelectDish } from "../../../db/dishes/dishes"
import updateOrder from "../../../db/orders/mutations/updateOrder"

export const OrderCards = ({
  restaurants,
  orders,
  dishes,
  currency,
}: {
  restaurants?: RestaurantIndex[]
  orders: OrderPick[]
  dishes: DishSelectDish[]
  currency?: string
}) => {
  const [setState] = useMutation(setOrderState)
  const [setPayed] = useMutation(setOrderPayed)
  const [setDelivered] = useMutation(setOrderDelivered)
  const [uptOrder] = useMutation(updateOrder)
  const [setNotes] = useMutation(setOrderNotes)
  const [cancOrder] = useMutation(cancelOrder)
  const [deleteOrd] = useMutation(deleteOrder)
  const restaurantId = useRestaurantId()

  const router = useRouter()
  const handleSelectRestaurant = (v: number) => router.push(`${Routes.OrdersPage().href}/${v}`)
  const handleOpenArchive = () =>
    router.push(
      restaurantId != null
        ? `${Routes.ArchivePage().href}/${restaurantId}`
        : Routes.ArchivePage().href
    )

  const refresh = useRefresh()
  const handleStateChange = (id, state) => setState({ id, state }).then(refresh)
  const handlePayedChange = (id, payed) => setPayed({ id, payed }).then(refresh)
  const handleDeliveredChange = (id, delivered) => setDelivered({ id, delivered }).then(refresh)
  const handleOrderChange = (id, dishes, notes) => uptOrder({ id, dishes, notes }).then(refresh)
  const handleNotesChange = (id, notes) => setNotes({ id, notes }).then(refresh)
  const handleCancelOrder = (id) => cancOrder(id).then(refresh)
  const handleDeleteOrder = (id) => deleteOrd(id).then(refresh)

  return (
    <Cards
      restaurantId={restaurantId}
      restaurants={restaurants}
      orders={orders}
      dishes={dishes}
      currency={currency}
      onSelectRestaurant={handleSelectRestaurant}
      onOpenArchive={handleOpenArchive}
      onStateChange={handleStateChange}
      onPayedChange={handlePayedChange}
      onDeliveredChange={handleDeliveredChange}
      onOrderChanged={handleOrderChange}
      onNotesChange={handleNotesChange}
      onCancel={handleCancelOrder}
      onDelete={handleDeleteOrder}
    />
  )
}
