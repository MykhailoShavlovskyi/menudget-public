import { TableCard } from "./TableCard"
import { TablePick } from "../../../db/tables/tables"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { AddTableCard } from "../../../components/cms/tables/AddTableCard"
import { QrOverlay } from "../../../components/cms/tables/QrOverlay"
import { useCallback, useRef, useState } from "react"
import { useId, useRestaurantId } from "../../../store/cms/cms"
import { downloadCanvasImage } from "../../../lib/download"

export const TableCards = ({
  tables,
  restaurantName,
}: {
  tables: TablePick[]
  restaurantName?: string
}) => {
  const id = useId()

  // Handle create table
  const restaurantId = useRestaurantId()
  const router = useRouter()
  const handleCreateTable = () => router.push(`${Routes.TablesPage().pathname}/${restaurantId}/new`)

  // Handle open QR
  const [qrTableId, setQrTableId] = useState<number | undefined>()
  const [qrVisible, setQrVisible] = useState(false)

  // Handle download QR
  const qrCanvasRef = useRef<any>()
  const handleDownloadQr = useCallback(
    (tableId: number, tableName: string) => {
      setQrTableId(tableId)
      requestAnimationFrame(() => {
        const container = qrCanvasRef.current
        const canvas = container?.firstChild as HTMLCanvasElement | undefined
        if (canvas) downloadCanvasImage(canvas, `${tableName} - ${restaurantName}`)
      })
    },
    [restaurantName, qrCanvasRef.current]
  )

  return (
    <>
      <AddTableCard onClick={handleCreateTable} />
      {tables.map((v) => (
        <TableCard
          key={v.id}
          restaurantName={restaurantName}
          onShowQr={() => {
            setQrTableId(v.id)
            setQrVisible(true)
          }}
          onDownloadQr={() => handleDownloadQr(v.id, v.name)}
          {...v}
        />
      ))}
      <QrOverlay
        ref={qrCanvasRef}
        restaurantId={restaurantId}
        tableId={qrTableId}
        visible={qrVisible}
        onClose={() => {
          setQrTableId(undefined)
          setQrVisible(false)
        }}
      />
    </>
  )
}
