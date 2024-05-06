import { DishPick } from "../../../db/dishes/dishes"
import React, { useMemo, useState } from "react"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { useCategoryId } from "../../../components/cms/layout/DishesLayout"
import { getFileUrl } from "../../../../s3/s3"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useId, useRestaurantId } from "../../../store/cms/cms"
import { DishCard } from "../../../components/cms/dishes/DishCard"
import { AddDishCard } from "../../../components/cms/dishes/AddDishCard"
import { ConfirmDeleteModal } from "../../../components/cms/common/modal/ConfirmDeleteModal"
import { useMutation } from "@blitzjs/rpc"
import deleteDish from "../../../db/dishes/mutations/deleteDish"
import { useRefresh } from "../../../lib/useRefresh"

export const DishCards = ({ dishes, currency }: { dishes: DishPick[]; currency: string }) => {
  const categoryId = useCategoryId()
  const dishId = useId()
  const filtered = useMemo(
    () => dishes.filter((v) => v.categoryId === categoryId).sort((a, b) => a.order - b.order),
    [dishes, categoryId]
  )

  // Handle edit
  const router = useRouter()
  const restaurantId = useRestaurantId()
  const handleClick = (id) => router.push(`${Routes.DishesPage().href}/${restaurantId}/${id}`)

  // Handle create new
  const handleCreateDish = () => router.push(`${Routes.DishesPage().pathname}/${restaurantId}/new`)

  // Handle delete
  const [deletedDishId, setDeletedDishId] = useState<number>()
  const [remove] = useMutation(deleteDish)
  const refresh = useRefresh()
  const handleDelete = async () => {
    await remove(deletedDishId)
    await refresh()
    setDeletedDishId(undefined)
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <AddDishCard onClick={handleCreateDish} />
        {filtered.map((d, i) => (
          <DishCard
            key={d.id}
            id={d.id}
            imageUrl={d.imageKey ? getFileUrl(d.imageKey) : undefined}
            name={d.name}
            description={d.description}
            measurement={d.measurement}
            price={d.price}
            featured={d.featured}
            topOfTheWeek={d.topOfTheWeek}
            currency={currency}
            sticker={d.sticker}
            selected={dishId === d.id}
            onClick={() => handleClick(d.id)}
            onDelete={() => setDeletedDishId(d.id)}
          />
        ))}
        <ConfirmDeleteModal
          isOpen={deletedDishId != null}
          name={dishes.find((v) => v.id === deletedDishId)?.name ?? ""}
          onConfirm={handleDelete}
          onCancel={() => setDeletedDishId(undefined)}
        />
      </DndProvider>
    </>
  )
}
