import {
  DishCard as DishCardBase,
  MenuDishes as MenuDishesBase,
} from "../../components/app/menu/MenuDishes"
import {
  useDishDescription,
  useDishMeasurement,
  useDishName,
  useDishPrice,
  useDishSpicyLevel,
  useDishSticker,
  useDishThumbnailUrl,
  useDisplayedCategoryDishIds,
  useRestaurantCurrency,
} from "../../store/app/selectors"
import { orderDish, setSelectedDish } from "../../store/app/slice"
import { useMount } from "react-use"
import { useEffect } from "react"

const DishCard = ({ id }: { id: number }) => (
  <DishCardBase
    key={`menu-${id}`}
    measurement={useDishMeasurement(id)}
    thumbnailUrl={useDishThumbnailUrl(id)}
    name={useDishName(id) ?? ""}
    description={useDishDescription(id) ?? ""}
    price={useDishPrice(id) ?? 0}
    currency={useRestaurantCurrency()}
    spicyLevel={useDishSpicyLevel(id) ?? 0}
    sticker={useDishSticker(id)}
    onSelect={() => setSelectedDish(id)}
    onAddToCart={() => orderDish(id, 1)}
  />
)

export const MenuDishes = () => (
  <MenuDishesBase
    dishes={useDisplayedCategoryDishIds().map((v) => (
      <DishCard key={v} id={v} />
    ))}
  />
)
