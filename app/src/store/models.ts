export type User = {
  id: number;
  restaurantId: number;
  name: string;
  email: string;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  currency: string;
  openTimes: number[];
  closeTimes: number[];
  logoUrl?: string;
  bannerUrl?: string;
};

export type Dish = {
  id: number;

  name: string;
  description: string;
  category: string;
  measurementUnit: string;
  measurementValue: number;
  price: number;
  spicyLevel: number;
  labels: string[];
  ingredients: string;
  featured: boolean;
  sticker: string;
  colorBorder: boolean;
  color?: string;

  imageUrls: string[];
  modelUrl?: string;
};

export type Menu = {
  fetched: boolean;
  search: string;
  filter: boolean;
  filterCategories: string[];
  filterLabels: string[];
  filterSpicyLevel: number;
  category: string;
};

export type OrderedDish = {id: number; count: number; finalized: boolean};
export type TableOrder = {
  dishes: OrderedDish[];
  tableId?: number;
  tableName?: string;
  notes: string;
  promo: string;
};

export type Table = {
  id: number;
  name: string;
  state: 'string';
};

export type Tables = {
  tables: Table[];
};

export type ActiveOrderDish = {
  id: number;
  name: string;
  count: number;
  price: number;
  imageKeys: string[];
};

export type ActiveOrder = {
  id: number;
  tableId: number;
  tableName: string;
  tableIdle: boolean;
  state: string;
  payed: boolean;
  delivered: boolean;
  createdAt: Date;

  dishes: ActiveOrderDish[];
};

export type Store = {
  user: User | null;
  restaurant: Restaurant;
  dishes: Dish[];
  tables: Tables;
  orders: ActiveOrder[];
  menu: Menu;
  bookmarks: number[];
  orderedDishCount: number;
  order: TableOrder;
  screen: string;
  isDishScreen: boolean;
};
