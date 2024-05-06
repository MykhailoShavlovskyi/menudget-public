import { useMutation } from "@blitzjs/rpc"
import createRestaurant from "../../../db/restaurants/mutations/createRestaurant"
import updateRestaurant from "../../../db/restaurants/mutations/updateRestaurant"
import deleteRestaurant from "../../../db/restaurants/mutations/deleteRestaurant"
import { useRefresh } from "../../../lib/useRefresh"
import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { Restaurant } from "@prisma/client"
import { addRestaurantImageAsync, deleteFile, getFileUrl } from "../../../../s3/s3"
import {
  CreateRestaurantFormValues,
  RestaurantForm as Form,
  UpdateRestaurantFormValues,
} from "../../../components/cms/restaurants/RestaurantForm"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"
import { addAlert } from "../../../components/cms/Alerts"
import { v4 as uuid } from "uuid"

export const RestaurantForm = ({ restaurant }: { restaurant?: Restaurant }) => {
  const [create] = useMutation(createRestaurant)
  const [update] = useMutation(updateRestaurant)
  const [remove] = useMutation(deleteRestaurant)
  const refresh = useRefresh()
  const router = useRouter()

  const [key, setKey] = useState(uuid())
  useEffect(() => setKey(uuid()), [restaurant])

  const initialValues = useMemo(() => {
    if (restaurant) {
      const { bannerKey, logoKey, openTimes, closeTimes, currency, ...rest } = restaurant
      return {
        currency: currency as "usd" | "eur",
        openTimes: openTimes as number[],
        closeTimes: closeTimes as number[],
        logo: logoKey ? [{ dataURL: getFileUrl(logoKey) }] : undefined,
        banner: bannerKey ? [{ dataURL: getFileUrl(bannerKey) }] : undefined,
        ...rest,
      }
    }
    return undefined
  }, [restaurant])

  const handleSubmit = async (props: CreateRestaurantFormValues | UpdateRestaurantFormValues) => {
    const { logo, banner, ...rest } = props

    async function handleImages(restaurantId: number) {
      let logoKey, bannerKey
      if (logo?.[0]?.file) logoKey = await addRestaurantImageAsync(restaurantId, logo[0].file)
      if (logo?.[0] == null) {
        if (restaurant?.logoKey) void deleteFile(restaurant.logoKey)
        logoKey = null
      }
      if (banner?.[0]?.file) bannerKey = await addRestaurantImageAsync(restaurantId, banner[0].file)
      if (banner?.[0] == null) {
        if (restaurant?.bannerKey) void deleteFile(restaurant.bannerKey)
        bannerKey = null
      }
      return { logoKey, bannerKey }
    }

    try {
      // Update
      if (restaurant) {
        await update({ id: restaurant.id, ...rest, ...(await handleImages(restaurant.id)) })
        await refresh()
        addAlert(`'${rest.name}' was successfully saved`)
        return
      }

      // Create
      const { id } = await create({
        ...rest,
        managerEmail: (rest as CreateRestaurantFormValues).managerEmail,
      })
      await update({ id, ...(await handleImages(id)) })
      await router.push(`${Routes.RestaurantsPage().href}/${id}`)
      addAlert(`'${rest.name}' was successfully saved`)
    } catch (error) {
      return { [FORM_ERROR]: JSON.parse(error.message)[0].message }
    }
  }

  const handleDelete = () =>
    remove(restaurant?.id).then(() => router.push(Routes.RestaurantsPage().href))

  const handleClose = () => router.push(Routes.RestaurantsPage().href)

  return (
    <Form
      key={key}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClose={handleClose}
    />
  )
}
