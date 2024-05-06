import { noop, uniq } from "lodash"
import { MenuHeader as MenuHeaderBase } from "./MenuHeader"
import { useTodayTime } from "../../../store/app/utils"
import { Category as CategoryBase, MenuCategories as MenuCategoriesBase } from "./MenuCategories"
import { DishCard as DishCardBase, MenuDishes as MenuDishesBase } from "./MenuDishes"
import { MenuSearch as MenuSearchBase } from "./MenuSearch"
import React from "react"
import { Dish, Restaurant } from "../../../store/app/models"

export const MenuSSR = ({ restaurant, dishes }: { restaurant: Restaurant; dishes: Dish[] }) => {
  const categories = uniq(dishes.map((v) => v.category))
  const firstCatDishes = dishes.filter((v) => v.category === categories[0])

  return (
    <>
      <MenuHeaderBase
        bannerUrl={restaurant.bannerUrl}
        logoUrl={restaurant.logoUrl}
        openTime={useTodayTime(restaurant.openTimes) ?? 0}
        closeTime={useTodayTime(restaurant.closeTimes) ?? 0}
        name={restaurant.name}
        description={restaurant.description}
      />
      <MenuSearchBase search={""} filter={false} onFilterChange={noop} onSearchChange={noop} />
      {categories.length > 0 && (
        <MenuCategoriesBase>
          {categories.map((v, i) => (
            <CategoryBase key={v} name={v} selected={i === 0} onClick={noop} />
          ))}
        </MenuCategoriesBase>
      )}
      <MenuDishesBase
        dishes={firstCatDishes.map((v) => (
          <DishCardBase
            key={v.id}
            measurement={v.measurementValue + v.measurementUnit}
            thumbnailUrl={v.imageUrls[0]}
            name={v.name}
            description={v.description}
            price={v.price}
            currency={restaurant.currency}
            spicyLevel={v.spicyLevel}
            sticker={v.sticker}
            onSelect={noop}
            onAddToCart={noop}
          />
        ))}
      />
      <MenuSearchBase search={""} filter={false} onFilterChange={noop} onSearchChange={noop} />
      <div style={{ height: "5rem" }} />
    </>
  )
}
