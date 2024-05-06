import {
  CategoriesForm as Form,
  CategoriesFormValues,
} from "../../../components/cms/dishes/CategoriesForm"
import { useRefresh } from "../../../lib/useRefresh"
import { useRestaurantId } from "../../../store/cms/cms"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Category } from "@prisma/client"
import updateCategories from "../../../db/dishes/mutations/updateCategories"
import { useMutation } from "@blitzjs/rpc"
import { addAlert } from "../../../components/cms/Alerts"

export const CategoriesForm = ({
  categories,
}: {
  categories: Pick<Category, "id" | "name" | "order">[]
}) => {
  const restaurantId = useRestaurantId()
  const [update] = useMutation(updateCategories)
  const refresh = useRefresh()
  const router = useRouter()

  const handleSubmit = async (props: CategoriesFormValues) => {
    if (restaurantId == null) return
    await update({ restaurantId, categories: props.categories })
    await refresh()
    addAlert("Categories were successfully updated")
  }

  const handleClose = () => router.push(`${Routes.DishesPage().href}/${restaurantId}`)

  return <Form initialValues={{ categories }} onSubmit={handleSubmit} onClose={handleClose} />
}
