import { CardsGrid } from "../cards-grid/CardsGrid"
import { ReactNode } from "react"

export const WaitersCardsGrid = (props: { heading?: ReactNode; cards?: ReactNode }) => (
  <CardsGrid width={24.5} height={12.625} {...props} />
)
