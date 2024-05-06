import {
  Category as CategoryBase,
  MenuCategories as MenuCategoriesBase,
} from "../../components/app/menu/MenuCategories"
import { useDisplayedMenuCategory, useFilteredDishesCategories } from "../../store/app/selectors"
import { setCategory } from "../../store/app/slice"

const Category = ({ name }: { name: string }) => (
  <CategoryBase
    name={name}
    selected={useDisplayedMenuCategory() === name}
    onClick={() => setCategory(name)}
  />
)

export const MenuCategories = () => {
  const categories = useFilteredDishesCategories()
  if (categories.length === 0) return null

  return (
    <MenuCategoriesBase>
      {categories.map((v, i) => (
        <Category key={v + i} name={v} />
      ))}
    </MenuCategoriesBase>
  )
}
