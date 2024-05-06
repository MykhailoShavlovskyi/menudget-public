import { AddNewCard } from "../common/card/AddNewCard"

export const AddPromoCard = ({ onClick }: { onClick: () => void }) => (
  <AddNewCard label={"Add new promo"} horizontal={true} onClick={onClick} />
)
