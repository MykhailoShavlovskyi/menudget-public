import {createStore, mapValuesKey} from '@udecode/zustood';
import {uniq} from 'lodash';
import {
  Dish,
  ActiveOrder,
  Restaurant,
  Store,
  Table,
  User,
  TableOrder,
} from './models';

const initialState: Store = {
  user: null,
  restaurant: {
    id: -1,
    name: '',
    description: '',
    openTimes: [],
    closeTimes: [],
  },
  dishes: [],
  orders: [],
  tables: {tables: []},
  menu: {
    fetched: false,
    search: '',
    filter: false,
    filterCategories: [],
    filterLabels: [],
    filterSpicyLevel: 5,
    category: '',
  },
  bookmarks: [],
  orderedDishCount: 1,
  order: {dishes: [], notes: '', promo: ''},
  screen: 'menu',
  isDishScreen: false,
};

export const store = createStore('store')<Store>(initialState).extendActions(
  (set, get, api) => ({
    menuRetrieved: ({
      restaurant,
      dishes,
      tableId,
      tableName,
    }: {
      restaurant: Restaurant;
      dishes: Dish[];
      tableId: number;
      tableName: string;
    }) => {
      // Restaurant & dishes
      const oldRestaurant = get.restaurant();
      set.restaurant(restaurant);
      set.dishes(dishes);

      // Order
      const order = get.order();
      const newRestaurant = oldRestaurant.id !== restaurant.id;
      if (!newRestaurant) set.order({...order, tableName, tableId});
      else set.order({dishes: [], notes: '', promo: '', tableName, tableId});

      // Menu
      set.menu({
        ...get.menu(),
        fetched: true,
        search: '',
        filter: false,
        filterCategories: uniq(dishes.map(v => v.category)),
        filterLabels: uniq(dishes.flatMap(v => v.labels)),
        filterSpicyLevel: 5,
        category: dishes.some(v => v.featured)
          ? "Chef's recomended"
          : dishes[0].category,
      });

      // Rest
      if (newRestaurant) {
        set.bookmarks([]);
        set.orderedDishCount(1);
      }
      set.screen('menu');
    },
    userRetrieved: (
      user: User,
      restaurant: Restaurant,
      tables: Table[],
      dishes: Dish[],
    ) => {
      // Data
      set.user(user);
      set.restaurant(restaurant);
      set.dishes(dishes);
      set.tables({...get.tables(), tables});

      // Menu
      set.menu({
        ...get.menu(),
        fetched: true,
        category: dishes.some(v => v.featured)
          ? "Chef's recomended"
          : dishes[0].category,
        filterCategories: uniq(dishes.map(v => v.category)),
        filterLabels: uniq(dishes.flatMap(v => v.labels)),
      });
    },
    setTables: (tables: Table[]) => {
      set.tables({...get.tables(), tables});
    },
    setOrders: (orders: ActiveOrder[]) => {
      orders.forEach(v => (v.createdAt = new Date(v.createdAt)));
      set.orders(orders);
    },
    setTable: (id: number) => {
      const tables = get.tables();
      const table = tables.tables.find(v => v.id === id);
      set.order({
        ...get.order(),
        dishes: [],
        notes: '',
        promo: '',
        tableId: id,
        tableName: table?.name,
      });
    },
    resetMenuFetched: () => {
      set.menu({...get.menu(), fetched: false});
    },
    setSearch: (search: string) => {
      set.menu({...get.menu(), search});
    },
    setFilter: (filter: boolean) => {
      set.menu({...get.menu(), filter});
    },
    resetFilter: (filter: boolean) => {
      const dishes = get.dishes();
      set.menu({
        ...get.menu(),
        filterCategories: uniq(dishes.map(v => v.category)),
        filterLabels: uniq(dishes.flatMap(v => v.labels)),
        filterSpicyLevel: 5,
      });
    },
    addFilterCategory: (category: string) => {
      const menu = get.menu();
      set.menu({
        ...menu,
        filterCategories: [...menu.filterCategories, category],
      });
    },
    removeFilterCategory: (category: string) => {
      const menu = get.menu();
      set.menu({
        ...menu,
        filterCategories: menu.filterCategories.filter(v => v !== category),
      });
    },
    addFilterLabel: (label: string) => {
      const menu = get.menu();
      set.menu({...menu, filterLabels: [...menu.filterLabels, label]});
    },
    removeFilterLabel: (label: string) => {
      const menu = get.menu();
      set.menu({
        ...menu,
        filterLabels: menu.filterLabels.filter(v => v !== label),
      });
    },
    setSpicyLevelFilter: (filterSpicyLevel: number) => {
      const menu = get.menu();
      set.menu({
        ...menu,
        filterSpicyLevel,
      });
    },
    setCategory: (category: string) => {
      set.menu({...get.menu(), category});
    },

    setBookmarks: (ids: number[]) => {
      set.bookmarks(ids);
    },
    addBookmark: (id: number) => {
      set.bookmarks(uniq([...get.bookmarks(), id]));
    },
    removeBookmark: (id: number) => {
      set.bookmarks(get.bookmarks().filter(v => v !== id));
    },
    setOrder: (order: TableOrder) => {
      set.order(order);
    },
    setOrderedDishCount: (count: number) => {
      set.orderedDishCount(count);
    },
    orderDish: (id: number, count: number) => {
      const order = get.order();
      const existing = order.dishes.find(v => v.id === id && !v.finalized);
      const other = order.dishes.filter(v => v != existing);
      set.order({
        ...order,
        dishes: [
          ...other,
          {id, count: (existing?.count ?? 0) + count, finalized: false},
        ],
      });
    },
    removeOrderedDish: (id: number) => {
      const order = get.order();
      const existing = order.dishes.find(v => v.id === id && !v.finalized);
      if (existing) {
        const other = order.dishes.filter(v => v != existing);
        if (existing.count === 1) set.order({...order, dishes: other});
        else
          set.order({
            ...order,
            dishes: [
              ...other,
              {id, count: existing.count - 1, finalized: false},
            ],
          });
      }
    },
    setOrderNotes: (notes: string) => {
      const order = get.order();
      set.order({...order, notes});
    },
    setOrderPromo: (promo: string) => {
      const order = get.order();
      set.order({...order, promo});
    },
    finalizeOrder: () => {
      const order = get.order();
      set.order({
        ...order,
        dishes: order.dishes.map(v => ({...v, finalized: true})),
        notes: '',
      });
    },
    logout: () => {
      set.user(null);
    },
  }),
);

// Actions
export const {
  store: {
    menuRetrieved,
    userRetrieved,
    setTables,
    setOrders,
    setTable,
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
    setBookmarks,
    addBookmark,
    removeBookmark,
    setOrder,
    setOrderedDishCount,
    orderDish,
    removeOrderedDish,
    setOrderNotes,
    setOrderPromo,
    finalizeOrder,
    logout,
  },
} = mapValuesKey('set', {store});

export const setScreen = (screen: string) => {
  store.set.screen(screen);
};

export const setIsDishScreen = (value: boolean) => {
  store.set.isDishScreen(value);
};
