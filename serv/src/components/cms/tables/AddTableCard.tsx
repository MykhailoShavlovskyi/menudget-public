import { AddNewCard } from "../common/card/AddNewCard"
import { getLblAddNewTable } from "../../../messages/tables"

export const AddTableCard = ({ onClick }: { onClick: () => void }) => (
  <AddNewCard label={getLblAddNewTable()} onClick={onClick} />
)
