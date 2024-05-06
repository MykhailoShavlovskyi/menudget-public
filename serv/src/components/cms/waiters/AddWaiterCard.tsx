import { AddNewCard } from "../common/card/AddNewCard"
import { getLblAddNewWaiter } from "../../../messages/waiters"

export const AddWaiterCard = ({ onClick }: { onClick: () => void }) => (
  <AddNewCard label={getLblAddNewWaiter()} horizontal={true} onClick={onClick} />
)
