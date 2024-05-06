import { RestaurantPick } from "../../../db/restaurants/restaurants"
import React from "react"
import { getFileUrl } from "../../../../s3/s3"
import { RestaurantCard } from "../../../components/cms/restaurants/RestaurantCard"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { AddRestaurantCard } from "../../../components/cms/restaurants/AddRestaurantCard"
import { useId } from "../../../store/cms/cms"

export const RestaurantCards = ({ restaurants }: { restaurants: RestaurantPick[] }) => {
  const id = useId()
  const router = useRouter()
  const handleAddNewRestaurant = () => router.push(`${Routes.NewRestaurantPage().href}`)
  const handleClick = (id: number) => router.push(`${Routes.RestaurantsPage().href}/${id}`)
  const handleDoubleClick = (id: number) => router.push(`${Routes.DishesPage().href}/${id}`)

  return (
    <>
      <AddRestaurantCard onClick={handleAddNewRestaurant} />
      {restaurants.map((v) => (
        <RestaurantCard
          key={v.id}
          bannerUrl={v.bannerKey ? getFileUrl(v.bannerKey) : undefined}
          logoUrl={v.logoKey ? getFileUrl(v.logoKey) : undefined}
          selected={id === v.id}
          onClick={() => handleClick(v.id)}
          onDoubleClick={() => handleDoubleClick(v.id)}
          {...v}
        />
      ))}
    </>
  )
}
