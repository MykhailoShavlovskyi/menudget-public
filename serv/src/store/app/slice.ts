import { createStore, mapValuesKey } from "@udecode/zustood"
import { uniq } from "lodash"
import { Dish, Restaurant, Store } from "./models"

const orderKey = "menudget-order"
const bookmarksKey = "menudget-bookmarks"

const storedOrder = typeof window !== "undefined" ? localStorage.getItem(orderKey) : undefined
const storedBookmarks =
  typeof window !== "undefined" ? localStorage.getItem(bookmarksKey) : undefined

const initialState: Store = {
  restaurant: {
    id: -1,
    name: "",
    description: "",
    currency: "eur",
    openTimes: [],
    closeTimes: [],
    logoUrl: null,
    bannerUrl: null,
  },
  dishes: [],
  menu: {
    fetched: false,
    search: "",
    filter: false,
    filterCategories: [],
    filterLabels: [],
    filterSpicyLevel: 5,
    category: "",
  },
  bookmarks: storedBookmarks ? JSON.parse(storedBookmarks) : [],
  orderedDishCount: 1,
  order: storedOrder ? JSON.parse(storedOrder) : { open: false, dishes: [], notes: "", promo: "" },
  screen: "menu",
  dishId: null,
  dishOpen: false,
}

export const store = createStore("store")<Store>(initialState, {
  persist: { enabled: true, name: "menudget" },
}).extendActions((set, get, api) => ({
  menuRetrieved: ({
    restaurant,
    dishes,
    tableId,
    tableName,
  }: {
    restaurant: Restaurant
    dishes: Dish[]
    tableId?: number
    tableName: string
  }) => {
    // Restaurant & dishes
    const oldRestaurant = get.restaurant()
    set.restaurant(restaurant)
    set.dishes(dishes)

    // Order
    const order = get.order()
    const newRestaurant = oldRestaurant.id !== restaurant.id
    if (!newRestaurant) set.order({ ...order, tableName, tableId })
    else set.order({ open: false, dishes: [], notes: "", promo: "", tableName, tableId })
    localStorage.setItem(orderKey, JSON.stringify(get.order()))

    // Menu
    set.menu({
      ...get.menu(),
      fetched: true,
      search: "",
      filter: false,
      filterCategories: uniq(dishes.map((v) => v.category)),
      filterLabels: uniq(dishes.flatMap((v) => v.labels)),
      filterSpicyLevel: 5,
      category: dishes.some((v) => v.featured) ? "Chef's recomended" : dishes[0]?.category ?? "",
    })

    // Rest
    if (newRestaurant) {
      set.bookmarks([])
      set.orderedDishCount(1)
      localStorage.setItem(bookmarksKey, JSON.stringify(get.bookmarks()))
    }
    set.dishId(null)
    set.dishOpen(false)
    set.screen("menu")
  },
  resetMenuFetched: () => {
    set.menu({ ...get.menu(), fetched: false })
  },
  setSearch: (search: string) => {
    set.menu({ ...get.menu(), search })
  },
  setFilter: (filter: boolean) => {
    set.menu({ ...get.menu(), filter })
  },
  resetFilter: () => {
    const dishes = get.dishes()
    set.menu({
      ...get.menu(),
      filterCategories: uniq(dishes.map((v) => v.category)),
      filterLabels: uniq(dishes.flatMap((v) => v.labels)),
      filterSpicyLevel: 5,
    })
  },
  addFilterCategory: (category: string) => {
    const menu = get.menu()
    set.menu({
      ...menu,
      filterCategories: [...menu.filterCategories, category],
    })
  },
  removeFilterCategory: (category: string) => {
    const menu = get.menu()
    set.menu({
      ...menu,
      filterCategories: menu.filterCategories.filter((v) => v !== category),
    })
  },
  addFilterLabel: (label: string) => {
    const menu = get.menu()
    set.menu({ ...menu, filterLabels: [...menu.filterLabels, label] })
  },
  removeFilterLabel: (label: string) => {
    const menu = get.menu()
    set.menu({
      ...menu,
      filterLabels: menu.filterLabels.filter((v) => v !== label),
    })
  },
  setSpicyLevelFilter: (filterSpicyLevel: number) => {
    const menu = get.menu()
    set.menu({
      ...menu,
      filterSpicyLevel,
    })
  },
  setCategory: (category: string) => {
    set.menu({ ...get.menu(), category })
  },
  setSelectedDish: (dishId: number | null) => {
    set.dishId(dishId)
    if (dishId != null) set.dishOpen(true)
    set.orderedDishCount(1)
  },
  setDishClosed: () => {
    set.dishOpen(false)
  },
  addBookmark: (id: number) => {
    set.bookmarks(uniq([...get.bookmarks(), id]))
    localStorage.setItem(bookmarksKey, JSON.stringify(get.bookmarks()))
  },
  removeBookmark: (id: number) => {
    set.bookmarks(get.bookmarks().filter((v) => v !== id))
    localStorage.setItem(bookmarksKey, JSON.stringify(get.bookmarks()))
  },
  setOrderOpen: (open: boolean) => {
    set.order({ ...get.order(), open })
    localStorage.setItem(orderKey, JSON.stringify(get.order()))
  },
  setOrderedDishCount: (count: number) => {
    set.orderedDishCount(count)
  },
  orderDish: (id: number, count: number) => {
    const order = get.order()
    const existing = order.dishes.find((v) => v.id === id && !v.finalized)
    const other = order.dishes.filter((v) => v != existing)
    set.order({
      ...order,
      dishes: [...other, { id, count: (existing?.count ?? 0) + count, finalized: false }],
    })
    localStorage.setItem(orderKey, JSON.stringify(get.order()))
  },
  removeOrderedDish: (id: number) => {
    const order = get.order()
    const existing = order.dishes.find((v) => v.id === id && !v.finalized)
    if (existing) {
      const other = order.dishes.filter((v) => v != existing)
      if (existing.count === 1) set.order({ ...order, dishes: other })
      else
        set.order({
          ...order,
          dishes: [...other, { id, count: existing.count - 1, finalized: false }],
        })
      localStorage.setItem(orderKey, JSON.stringify(get.order()))
    }
  },
  setOrderNotes: (notes: string) => {
    const order = get.order()
    set.order({ ...order, notes })
    localStorage.setItem(orderKey, JSON.stringify(get.order()))
  },
  setOrderPromo: (promo: string) => {
    const order = get.order()
    set.order({ ...order, promo })
    localStorage.setItem(orderKey, JSON.stringify(get.order()))
  },
  finalizeOrder: () => {
    const order = get.order()
    set.order({
      ...order,
      dishes: order.dishes.map((v) => ({ ...v, finalized: true })),
      notes: "",
    })
    localStorage.setItem(orderKey, JSON.stringify(get.order()))
  },
}))

// Actions
export const {
  store: {
    menuRetrieved,
    resetMenuFetched,
    setSearch,
    setFilter,
    resetFilter,
    addFilterCategory,
    removeFilterCategory,
    addFilterLabel,
    removeFilterLabel,
    setSpicyLevelFilter,
    setCategory,
    setSelectedDish,
    setDishClosed,
    addBookmark,
    removeBookmark,
    setOrderOpen,
    setOrderedDishCount,
    orderDish,
    removeOrderedDish,
    setOrderNotes,
    setOrderPromo,
    finalizeOrder,
  },
} = mapValuesKey("set", { store })

export const setScreen = (screen: string) => {
  store.set.screen(screen)
}
