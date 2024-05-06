import { NavBar as NavBarBase } from "../../components/app/NavBar"
import { useRestaurantId, useTableId } from "../../store/app/selectors"
import { setOrderOpen } from "../../store/app/slice"

export const NavBar = () => (
  <NavBarBase
    restaurantId={useRestaurantId()}
    tableId={useTableId()}
    onOpenReceipt={() => setOrderOpen(true)}
  />
)
