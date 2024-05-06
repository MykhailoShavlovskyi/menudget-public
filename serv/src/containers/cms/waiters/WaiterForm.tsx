import { useMutation } from "@blitzjs/rpc"
import { useRefresh } from "../../../lib/useRefresh"
import { WaiterForm as Form, WaiterFormValues } from "../../../components/cms/waiters/WaiterForm"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { WaiterWithTables } from "../../../db/waiters/waiters"
import updateWaiter from "../../../db/waiters/mutations/updateWaiter"
import deleteWaiter from "../../../db/waiters/mutations/deleteWaiter"
import createWaiter from "../../../db/waiters/mutations/createWaiter"
import { useRestaurantId } from "../../../store/cms/cms"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"
import { addAlert } from "../../../components/cms/Alerts"
import { v4 as uuid } from "uuid"
import { TablePick } from "../../../db/tables/tables"

export const WaiterForm = ({
  waiter,
  tables,
}: {
  waiter?: WaiterWithTables
  tables: TablePick[]
}) => {
  const restaurantId = useRestaurantId()
  const [create] = useMutation(createWaiter)
  const [update] = useMutation(updateWaiter)
  const [remove] = useMutation(deleteWaiter)
  const refresh = useRefresh()
  const router = useRouter()

  const [key, setKey] = useState(uuid())
  useEffect(() => setKey(uuid()), [waiter])

  const handleSubmit = async (props: WaiterFormValues) => {
    try {
      // Update
      if (waiter) {
        await update({ id: waiter.id, ...props })
        await refresh()
        addAlert(`'${props.name}' was successfully saved`)
        return
      }

      // Create
      if (restaurantId) {
        const { id } = await create({ restaurantId, ...props })
        await router.push(`${Routes.WaitersPage().href}/${restaurantId}/${id}`)
        addAlert(`'${props.name}' was successfully saved`)
      } else return { [FORM_ERROR]: "Cannot create waiter, restaurantId is no defined" }
    } catch (error) {
      return { [FORM_ERROR]: JSON.parse(error.message)[0].message }
    }
  }

  const handleDelete = () =>
    remove(waiter?.id).then(() => router.push(`${Routes.WaitersPage().href}/${restaurantId}`))

  const handleClose = () => router.push(`${Routes.WaitersPage().href}/${restaurantId}`)

  return (
    <Form
      key={key}
      initialValues={waiter}
      tables={tables}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClose={handleClose}
    />
  )
}
