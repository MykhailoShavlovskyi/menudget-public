import { AddNewCard } from "../common/card/AddNewCard"
import { getLblAddNewDish } from "../../../messages/dishes"

export const AddDishCard = ({ onClick }: { onClick: () => void }) => (
  <AddNewCard label={getLblAddNewDish()} horizontal={false} onClick={onClick} />
)
