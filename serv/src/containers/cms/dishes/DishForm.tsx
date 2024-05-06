import { DishForm as Form } from "../../../components/cms/dishes/dish-form/DishForm"
import { DishLabel } from "../../../definitions/DishLabel"
import { useMutation } from "@blitzjs/rpc"
import { useRefresh } from "../../../lib/useRefresh"
import createDish from "../../../db/dishes/mutations/createDish"
import updateDish from "../../../db/dishes/mutations/updateDish"
import deleteDish from "../../../db/dishes/mutations/deleteDish"
import { useRestaurantId } from "../../../store/cms/cms"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { addDishImage, addDishModel, deleteFile, getFileUrl } from "../../../../s3/s3"
import { compact } from "@chevrotain/utils"
import { useEffect, useMemo, useState } from "react"
import { ResolvedDish } from "../../../db/dishes/dishes"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"
import { addAlert } from "../../../components/cms/Alerts"
import { v4 as uuid } from "uuid"
import { Category } from "@prisma/client"

export const DishForm = ({
  dish,
  categories,
}: {
  dish?: ResolvedDish
  categories: Pick<Category, "id" | "name">[]
}) => {
  const restaurantId = useRestaurantId()
  const [create] = useMutation(createDish)
  const [update] = useMutation(updateDish)
  const [remove] = useMutation(deleteDish)
  const refresh = useRefresh()
  const router = useRouter()

  const [key, setKey] = useState(uuid())
  useEffect(() => setKey(uuid()), [dish])

  const initialValues = useMemo(() => {
    if (dish) {
      const { labels, imageKeys, modelKey, ...rest } = dish

      return {
        ...rest,
        labels: Object.values(DishLabel).map((v) => ({ name: v, checked: labels.includes(v) })),
        images: imageKeys.map((v) => ({ dataURL: getFileUrl(v) })),
        model: modelKey ? [{ dataURL: getFileUrl(modelKey) }] : [],
      }
    }
    return undefined
  }, [dish])

  // TODO specify props type when formik components are fixed
  const handleSubmit = async (props: any) => {
    const { carbs, labels, images, model, ...rest } = props
    rest.discount = rest.discount === "" ? null : rest.discount
    rest.calories = rest.calories === "" ? null : rest.calories
    rest.fat = rest.fat === "" ? null : rest.fat
    rest.protein = rest.protein === "" ? null : rest.protein
    rest.carbs = rest.carbs === "" ? null : rest.carbs

    function handleLabels() {
      return labels.filter((v) => v?.checked).map((v) => v.name)
    }

    async function handleImages() {
      if (restaurantId == null) return []

      // Create images
      const createdImageKeys = compact(
        await Promise.all(
          images.map(async (v) => {
            if (v.file) return addDishImage(restaurantId, v.file)
          })
        )
      )

      // Remove images
      const removedImageKeys =
        dish?.imageKeys.filter(
          (v) => !images.some((i) => i.dataURL?.includes(encodeURIComponent(v as string)))
        ) ?? []
      await Promise.all(removedImageKeys.map((v) => deleteFile(v as string)))

      // Get un-changed image keys
      const unchangedImageKeys =
        dish?.imageKeys.filter((v) =>
          images.some((i) => i.dataURL?.includes(encodeURIComponent(v as string)))
        ) ?? []

      return [...unchangedImageKeys, ...createdImageKeys]
    }

    async function handleModel() {
      if (restaurantId == null) return dish?.modelKey

      let modelKey

      // Create/replace model
      if (model[0] instanceof File) {
        if (dish?.modelKey != null) await deleteFile(dish.modelKey)
        modelKey = addDishModel(restaurantId, model[0])
      }

      // Remove image
      if (model[0] == null) modelKey = null

      return modelKey
    }

    try {
      // Update
      if (dish) {
        await update({
          id: dish.id,
          ...rest,
          labels: handleLabels(),
          imageKeys: await handleImages(),
          modelKey: await handleModel(),
        })
        await refresh()
        addAlert(`'${rest.name}' was successfully saved`)
        return
      }

      // Create
      if (restaurantId == null) return
      const { id } = await create({
        restaurantId,
        ...rest,
        labels: handleLabels(),
        imageKeys: await handleImages(),
        modelKey: await handleModel(),
      })
      await router.push(`${Routes.DishesPage().href}/${restaurantId}/${id}`)
      addAlert(`'${rest.name}' was successfully saved`)
    } catch (error) {
      return { [FORM_ERROR]: JSON.parse(error.message)[0].message }
    }
  }

  const handleDelete = () =>
    remove(dish?.id).then(() => router.push(`${Routes.DishesPage().href}/${restaurantId}`))

  const handleClose = () => router.push(`${Routes.DishesPage().href}/${restaurantId}`)

  return (
    <Form
      key={key}
      initialValues={initialValues}
      categories={categories}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClose={handleClose}
    />
  )
}
