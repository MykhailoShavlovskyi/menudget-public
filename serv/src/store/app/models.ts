export type Restaurant = {
  id: number
  name: string
  description: string
  currency: string
  openTimes: number[]
  closeTimes: number[]
  logoUrl: string | null
  bannerUrl: string | null
}

export type Dish = {
  id: number

  name: string
  description: string
  category: string
  measurementUnit: string
  measurementValue: number
  price: number
  spicyLevel: number
  labels: string[]
  ingredients: string
  featured: boolean
  colorBorder: boolean
  color: string | null
  sticker: string | null

  imageUrls: string[]
  modelUrl: string | null
}

export type Menu = {
  fetched: boolean
  search: string
  filter: boolean
  filterCategories: string[]
  filterLabels: string[]
  filterSpicyLevel: number
  category: string
}

export type OrderedDish = {
  id: number
  count: number
  finalized: boolean
}
export type TableOrder = {
  open: boolean
  dishes: OrderedDish[]
  tableId?: number
  tableName?: string
  notes: string
  promo: string
}

export type Store = {
  restaurant: Restaurant
  dishes: Dish[]
  menu: Menu
  bookmarks: number[]
  orderedDishCount: number
  order: TableOrder
  screen: string
  dishId: number | null
  dishOpen: boolean
}
