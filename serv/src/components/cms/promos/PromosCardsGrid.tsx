import { CardsGrid } from "../cards-grid/CardsGrid"
import { ReactNode } from "react"

export const PromosCardsGrid = (props: { heading?: ReactNode; cards?: ReactNode }) => (
  <CardsGrid width={24.5} height={12.625} {...props} />
)
