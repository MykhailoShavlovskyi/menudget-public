import { CardsGrid } from "../cards-grid/CardsGrid"
import { ReactNode } from "react"

export const TablesCardsGrid = (props: { heading?: ReactNode; cards?: ReactNode }) => (
  <CardsGrid width={20} height={16.5} {...props} />
)
