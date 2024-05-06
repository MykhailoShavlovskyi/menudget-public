import { TableCard as Card } from "../../../components/cms/tables/TableCard"
import { useId, useRestaurantId } from "../../../store/cms/cms"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { TablePick } from "../../../db/tables/tables"

export const TableCard = ({
  id,
  name,
  occupancy,
  restaurantName,
  onShowQr,
  onDownloadQr,
}: TablePick & {
  restaurantName?: string
  onShowQr: () => void
  onDownloadQr: () => void
}) => {
  const router = useRouter()
  const restaurantId = useRestaurantId()
  const selected = id === useId()
  const handleClick = () => router.push(`${Routes.TablesPage().href}/${restaurantId}/${id}`)

  if (restaurantId == null || restaurantName == null) return null
  return (
    <Card
      id={name}
      selected={selected}
      name={name}
      occupancy={occupancy}
      restaurantId={restaurantId}
      restaurantName={restaurantName}
      tableId={id}
      onClick={handleClick}
      onShowQr={onShowQr}
      onDownloadQr={onDownloadQr}
    />
  )
}
