import { AddNewCard } from "../common/card/AddNewCard"
import { getMsgAddNewRestaurant } from "../../../messages/restaurants"

export const AddRestaurantCard = ({ onClick }: { onClick: () => void }) => (
  <AddNewCard label={getMsgAddNewRestaurant()} onClick={onClick} />
)
