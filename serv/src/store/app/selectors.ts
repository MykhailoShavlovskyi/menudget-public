import { Dish } from "./models"
import Fuse from "fuse.js"
import { compact, sortBy, uniq } from "lodash"
import { useMemo } from "react"
import { mapValuesKey } from "@udecode/zustood"
import { store } from "./slice"
import { useTodayTime } from "./utils"

const useStore = () => {
  const { store: useStore } = mapValuesKey("useTracked", { store })
  return useStore
}

// Restaurant
export const useRestaurant = () => useStore().restaurant()
export const useRestaurantId = () => useRestaurant().id
export const useRestaurantName = () => useRestaurant().name
export const useRestaurantDescription = () => useRestaurant().description
export const useRestaurantCurrency = () => useRestaurant().currency
export const useRestaurantOpenTimes = () => useRestaurant().openTimes

export const useRestaurantTodayOpenTimes = () => {
  const times = useRestaurantOpenTimes()
  return useTodayTime(times)
}
export const useRestaurantCloseTimes = () => useRestaurant().closeTimes
export const useRestaurantTodayCloseTimes = () => {
  const times = useRestaurantCloseTimes()
  return useTodayTime(times)
}
export const useRestaurantLogoUrl = () => useRestaurant().logoUrl
export const useRestaurantBannerUrl = () => useRestaurant().bannerUrl

// Dishes
export const useDishes = () => useStore().dishes()

// Menu
export const useMenu = () => useStore().menu()
//export const useMenuFetched = () => false; // useMenu().fetched;
export const useMenuFetched = () => useMenu().fetched
export const useMenuSearch = () => useMenu().search
export const useMenuFilter = () => useMenu().filter
export const useMenuFilterCategories = () => useMenu().filterCategories
export const useMenuFilterLabels = () => useMenu().filterLabels
export const useMenuFilterSpicyLevel = () => useMenu().filterSpicyLevel
export const useMenuCategory = () => useMenu().category

export const useFilteredDishes = () => {
  const dishes = useDishes()
  const filterCategories = useMenuFilterCategories()
  const filterLabels = useMenuFilterLabels()
  const search = useMenuSearch()

  let filtered: Dish[] = []
  dishes.forEach((v) => {
    const hasLabels =
      v.labels.length === 0 || !v.labels.some((v: string) => !filterLabels.includes(v))

    if (filterCategories.includes(v.category) && hasLabels) filtered.push(v)
  })

  const fuse = new Fuse(filtered, {
    threshold: 0.35,
    useExtendedSearch: true,
    keys: ["name"],
  })
  return search !== "" ? fuse.search(search).map((v) => v.item) : filtered
}
export const useFilteredDishesCategories = () => {
  const dishes = useFilteredDishes()
  const categories = uniq(dishes.map((v) => v.category))
  if (dishes.some((v) => v.featured)) categories.unshift("Shef's recomended")
  return categories
}
export const useDisplayedMenuCategory = () => {
  const category = useMenuCategory()
  const categories = useFilteredDishesCategories()
  return categories.includes(category) ? category : categories[0]
}
export const useDisplayedCategoryDishes = () => {
  const category = useDisplayedMenuCategory()
  const dishes = useFilteredDishes()

  if (category === "Shef's recomended") return dishes.filter((v) => v.featured)
  return dishes.filter((v) => v.category === category)
}
export const useDisplayedCategoryDishIds = () => {
  const dishes = useDisplayedCategoryDishes()
  return dishes.map((v) => v.id)
}
export const useDishesCategories = () => uniq(useDishes().map((v) => v.category))
export const useDishesLabels = () => uniq(useDishes().flatMap((v) => v.labels))
export const useFilterCategoryEnabled = (category: string) =>
  useMenuFilterCategories().includes(category)
export const useFilterLabelEnabled = (label: string) => useMenuFilterLabels().includes(label)

// Bookmarks
export const useBookmarks = () => useStore().bookmarks()
export const useNoBookmarks = () => useBookmarks().length === 0
export const useBookmarkedDishes = () => {
  const dishes = useDishes()
  return compact(useBookmarks().map((id) => dishes.find((v) => v.id === id)))
}

// Dish
export const useDish = (id: number) => useDishes().find((v) => v.id === id)
export const useDishExists = (id: number) => useDish(id)?.name != null
export const useDishName = (id: number) => useDish(id)?.name
export const useDishDescription = (id: number) => useDish(id)?.description
export const useDishCategory = (id: number) => useDish(id)?.category
export const useDishMeasurementUnit = (id: number) => useDish(id)?.measurementUnit
export const useDishMeasurementValue = (id: number) => useDish(id)?.measurementValue
export const useDishMeasurement = (id: number) =>
  (useDishMeasurementValue(id) ?? "") + (useDishMeasurementUnit(id) ?? "")
export const useDishPrice = (id: number) => useDish(id)?.price
export const useDishSpicyLevel = (id: number) => useDish(id)?.spicyLevel
export const useDishLabels = (id: number) => useDish(id)?.labels
export const useDishIngredients = (id: number) => useDish(id)?.ingredients
export const useDisFeatured = (id: number) => useDish(id)?.featured
export const useDishColorBorder = (id: number) => useDish(id)?.colorBorder
export const useDishColor = (id: number) => useDish(id)?.color
export const useDishSticker = (id: number) => useDish(id)?.sticker
export const useDishImageUrls = (id: number) => useDish(id)?.imageUrls
export const useDishImageUrlsCount = (id: number) => useDishImageUrls(id)?.length
export const useDishThumbnailUrl = (id: number) => useDishImageUrls(id)?.[0]
export const useDishModelUrl = (id: number) => useDish(id)?.modelUrl
export const useDishBookmarked = (id: number) => useBookmarks().includes(id)

// Order
export const useOrder = () => useStore().order()
export const useOrderOpen = () => useOrder().open
export const useTableId = () => useOrder().tableId
export const useOrderedDishes = () => {
  const dishes = useDishes()
  const order = useOrder()

  return useMemo(
    () =>
      sortBy(
        compact(
          order.dishes.map((v) => {
            const dish = dishes.find((d) => v.id === d.id)
            if (dish == null) return null

            return {
              id: v.id,
              count: v.count,
              finalized: v.finalized,
              thumbnailUrl: dish.imageUrls[0],
              name: dish.name,
              price: dish.price,
            }
          })
        ),
        (v) => {
          return -v.price
        }
      ).sort((a, b) => {
        if (a?.finalized && !b?.finalized) return -1
        if (!a?.finalized && b?.finalized) return 1
        return 0
      }),
    [dishes, order]
  )
}
export const useNotFinalizedOrderDishes = () => useOrderedDishes().filter((v) => !v.finalized)
export const useOrderTableId = () => useOrder().tableId
export const useOrderTableName = () => useOrder().tableName
export const useOrderNotes = () => useOrder().notes
export const useOrderPromo = () => useOrder().promo
export const useOrderTotal = () => {
  const dishes = useOrderedDishes()
  return useMemo(
    () => dishes.reduce((accumulator, { price, count }) => accumulator + price * count, 0),
    [dishes]
  )
}

// Selected dish
export const useSelectedDishId = () => useStore().dishId()
export const useDishOpen = () => useStore().dishOpen()

// Misc
export const useOrderedDishCount = () => useStore().orderedDishCount()
export const useScreen = () => useStore().screen()
