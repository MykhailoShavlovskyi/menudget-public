import { useRefresh } from "../../../lib/useRefresh"
import { PromoForm as Form, PromoFormValues } from "../../../components/cms/promos/PromoForm"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useRestaurantId } from "../../../store/cms/cms"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"
import { v4 as uuid } from "uuid"
import { DishIndex } from "../../../db/dishes/dishes"
import createPromo from "../../../db/promos/mutations/createPromo"
import { useMutation } from "@blitzjs/rpc"
import { addAlert } from "../../../components/cms/Alerts"
import { ResolvedPromo } from "../../../db/promos/promos"
import deletePromo from "../../../db/promos/mutations/deletePromo"
import updatePromo from "../../../db/promos/mutations/updatePromo"

export const PromoForm = ({
  promo,
  currency,
  dishes,
}: {
  promo?: ResolvedPromo
  currency: string
  dishes: DishIndex[]
}) => {
  const restaurantId = useRestaurantId()
  const [create] = useMutation(createPromo)
  const [update] = useMutation(updatePromo)
  const [remove] = useMutation(deletePromo)
  const refresh = useRefresh()
  const router = useRouter()

  const [key, setKey] = useState(uuid())
  useEffect(() => setKey(uuid()), [promo])

  const handleSubmit = async (props: PromoFormValues) => {
    try {
      // Update
      if (promo) {
        await update({ id: promo.id, ...props })
        await refresh()
        addAlert(`'${props.name}' was successfully saved`)
        return
      }

      // Create
      if (restaurantId) {
        const { id } = await create({ restaurantId, ...props })
        await router.push(`${Routes.PromosPage().href}/${restaurantId}/${id}`)
        addAlert(`'${props.name}' was successfully saved`)
      } else return { [FORM_ERROR]: "Cannot create promo, restaurantId is no defined" }
    } catch (error) {
      return { [FORM_ERROR]: JSON.parse(error.message)[0].message }
    }
  }

  const handleDelete = () =>
    remove(promo?.id).then(() => router.push(`${Routes.PromosPage().href}/${restaurantId}`))

  const handleClose = () => router.push(`${Routes.PromosPage().href}/${restaurantId}`)

  return (
    <Form
      key={key}
      initialValues={promo}
      currency={currency}
      dishes={dishes}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClose={handleClose}
    />
  )
}
