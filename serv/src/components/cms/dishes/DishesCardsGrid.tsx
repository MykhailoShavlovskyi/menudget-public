import { ReactNode } from "react"
import { CardsGrid } from "../cards-grid/CardsGrid"

export const DishesCardsGrid = (props: { heading?: ReactNode; cards?: ReactNode }) => (
  <CardsGrid width={20} height={23.875} {...props} />
)
