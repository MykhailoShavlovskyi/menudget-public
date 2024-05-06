import {
    FilterItem,
    MenuFilterFooterButtons as FooterButtons,
    MenuFilters as Filters,
} from "../../components/app/menu/MenuFilters"
import {
    useDishesCategories,
    useDishesLabels,
    useFilterCategoryEnabled,
    useFilterLabelEnabled,
    useMenuFilterSpicyLevel,
} from "../../store/app/selectors"
import {useCallback} from "react"
import {
    addFilterCategory,
    addFilterLabel,
    removeFilterCategory,
    removeFilterLabel,
    resetFilter,
    setFilter,
    setSpicyLevelFilter,
} from "../../store/app/slice"
import {SpicyLevelSlider as SpicySlider} from "../../components/app/menu/SpicyLevelSlider"

// Categories
const CategoryItem = ({ name }: { name: string }) => {
  const enabled = useFilterCategoryEnabled(name)

  const handleToggle = useCallback(
    () => (enabled ? removeFilterCategory(name) : addFilterCategory(name)),
    [enabled, name]
  )

  return <FilterItem name={name} enabled={useFilterCategoryEnabled(name)} onToggle={handleToggle} />
}
const Categories = () => (
  <>
    {useDishesCategories().map((v) => (
      <CategoryItem key={v} name={v} />
    ))}
  </>
)

// Spicy level slider
const SpicyLevelSlider = () => (
  <SpicySlider level={useMenuFilterSpicyLevel()} onChange={setSpicyLevelFilter} />
)

// Labels
const LabelItem = ({ name }: { name: string }) => {
  const enabled = useFilterLabelEnabled(name)

  const handleToggle = useCallback(
    () => (enabled ? removeFilterLabel(name) : addFilterLabel(name)),
    [enabled, name]
  )

  return <FilterItem name={name} enabled={enabled} onToggle={handleToggle} />
}
const Labels = () => (
  <>
    {useDishesLabels().map((v) => (
      <LabelItem key={v} name={v} />
    ))}
  </>
)

// Footer buttons
const MenuFilterFooterButtons = () => (
  <FooterButtons onSave={() => setFilter(false)} onReset={resetFilter} />
)

export const MenuFilters = () => (
  <Filters
    categories={<Categories />}
    spicyLevel={<SpicyLevelSlider />}
    labels={<Labels />}
    footerButtons={<MenuFilterFooterButtons />}
  />
)
