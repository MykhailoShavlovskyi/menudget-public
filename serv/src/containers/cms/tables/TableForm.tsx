import { useMutation } from "@blitzjs/rpc"
import { useRefresh } from "../../../lib/useRefresh"
import { TableForm as Form, TableFormValues } from "../../../components/cms/tables/TableForm"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { TableWithWaiters } from "../../../db/tables/tables"
import updateTable from "../../../db/tables/mutations/updateTable"
import deleteTable from "../../../db/tables/mutations/deleteTable"
import createTable from "../../../db/tables/mutations/createTable"
import { useRestaurantId } from "../../../store/cms/cms"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"
import { addAlert } from "../../../components/cms/Alerts"
import { v4 as uuid } from "uuid"
import { WaiterIndex } from "../../../db/waiters/waiters"

export const TableForm = ({
  table,
  waiters,
}: {
  table?: TableWithWaiters
  waiters: WaiterIndex[]
}) => {
  const restaurantId = useRestaurantId()
  const [create] = useMutation(createTable)
  const [update] = useMutation(updateTable)
  const [remove] = useMutation(deleteTable)
  const refresh = useRefresh()
  const router = useRouter()

  const [key, setKey] = useState(uuid())
  useEffect(() => setKey(uuid()), [table])

  const handleSubmit = async (props: TableFormValues) => {
    try {
      // Update
      if (table) {
        await update({ id: table.id, ...props })
        await refresh()
        addAlert(`'${props.name}' was successfully saved`)
        return
      }

      // Create
      if (restaurantId) {
        const { id } = await create({ restaurantId, ...props })
        await router.push(`${Routes.TablesPage().href}/${restaurantId}/${id}`)
        addAlert(`'${props.name}' was successfully saved`)
      } else return { [FORM_ERROR]: "Cannot create table, restaurantId is no defined" }
    } catch (error) {
      return { [FORM_ERROR]: JSON.parse(error.message)[0].message }
    }
  }

  const handleDelete = () =>
    remove(table?.id).then(() => router.push(`${Routes.TablesPage().href}/${restaurantId}`))

  const handleClose = () => router.push(`${Routes.TablesPage().href}/${restaurantId}`)

  return (
    <Form
      key={key}
      initialValues={table}
      waiters={waiters}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClose={handleClose}
    />
  )
}
