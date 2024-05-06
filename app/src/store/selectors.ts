import {Dish} from './models';
import Fuse from 'fuse.js';
import {compact, sortBy, uniq} from 'lodash';
import {useMemo} from 'react';
import {mapValuesKey} from '@udecode/zustood';
import {store} from './slice';

const useStore = () => {
  const {store: useStore} = mapValuesKey('useTracked', {store});
  return useStore;
};

// User
export const useUser = () => useStore().user();
export const userUserId = () => useUser()?.id;
export const useUserLoggedIn = () => useUser() != null;
export const useUserRestaurantId = () => useUser()?.restaurantId;
export const useUserName = () => useUser()?.name;
export const useUserEmail = () => useUser()?.email;

// Restaurant
export const useRestaurant = () => useStore().restaurant();
export const useRestaurantName = () => useRestaurant().name;
export const useRestaurantDescription = () => useRestaurant().description;
export const useRestaurantCurrency = () => useRestaurant().currency;
export const useRestaurantOpenTimes = () => useRestaurant().openTimes;
export const useRestaurantTodayOpenTimes = () => {
  const times = useRestaurantOpenTimes();
  const date = new Date();
  if (date.getDay() === 0) {
    return times[6];
  }
  return times[date.getDay() - 1];
};
export const useRestaurantCloseTimes = () => useRestaurant().closeTimes;
export const useRestaurantTodayCloseTimes = () => {
  const times = useRestaurantCloseTimes();
  const date = new Date();
  if (date.getDay() === 0) {
    return times[6];
  }
  return times[date.getDay() - 1];
};
export const useRestaurantLogoUrl = () => useRestaurant().logoUrl;
export const useRestaurantBannerUrl = () => useRestaurant().bannerUrl;

// Dishes
export const useDishes = () => useStore().dishes();

// Tables
export const useTablesState = () => useStore().tables();
export const useTables = () => useTablesState().tables;

// Orders
export const userOrders = () => useStore().orders();
export const useSortedOrders = () => {
  const orders = userOrders();
  return sortBy(orders, v => v.tableName);
};

// Menu
export const useMenu = () => useStore().menu();
//export const useMenuFetched = () => false; // useMenu().fetched;
export const useMenuFetched = () => useMenu().fetched;
export const useMenuSearch = () => useMenu().search;
export const useMenuFilter = () => useMenu().filter;
export const useMenuFilterCategories = () => useMenu().filterCategories;
export const useMenuFilterLabels = () => useMenu().filterLabels;
export const useMenuFilterSpicyLevel = () => useMenu().filterSpicyLevel;
export const useMenuCategory = () => useMenu().category;
export const useFilteredDishes = () => {
  const dishes = useDishes();
  const filterCategories = useMenuFilterCategories();
  const filterLabels = useMenuFilterLabels();
  const search = useMenuSearch();

  let filtered: Dish[] = [];
  dishes.forEach(v => {
    const hasLabels =
      v.labels.length === 0 ||
      !v.labels.some((v: string) => !filterLabels.includes(v));

    if (filterCategories.includes(v.category) && hasLabels) {
      filtered.push(v);
    }
  });

  const fuse = new Fuse(filtered, {
    threshold: 0.35,
    useExtendedSearch: true,
    keys: ['name'],
  });
  return search !== '' ? fuse.search(search).map(v => v.item) : filtered;
};
export const useFilteredDishesCategories = () => {
  const dishes = useFilteredDishes();
  const categories = uniq(dishes.map(v => v.category));
  if (dishes.some(v => v.featured)) {
    categories.unshift("Chef's recomended");
  }
  return categories;
};
export const useDisplayedMenuCategory = () => {
  const category = useMenuCategory();
  const categories = useFilteredDishesCategories();
  return categories.includes(category) ? category : categories[0];
};
export const useDisplayedCategoryDishes = () => {
  const category = useDisplayedMenuCategory();
  const dishes = useFilteredDishes();

  if (category === "Chef's recomended") {
    return dishes.filter(v => v.featured);
  }
  return dishes.filter(v => v.category === category);
};
export const useDishesCategories = () => uniq(useDishes().map(v => v.category));
export const useDishesLabels = () => uniq(useDishes().flatMap(v => v.labels));

// Bookmarks
export const useBookmarks = () => useStore().bookmarks();
export const useBookmarkedDishes = () => {
  const dishes = useDishes();
  return compact(useBookmarks().map(id => dishes.find(v => v.id === id)));
};

// Dish
export const useDish = (id: number) => useDishes().find(v => v.id === id);
export const useDishExists = (id: number) => useDish(id)?.name != null;
export const useDishName = (id: number) => useDish(id)?.name;
export const useDishDescription = (id: number) => useDish(id)?.description;
export const useDishCategory = (id: number) => useDish(id)?.category;
export const useDishMeasurementUnit = (id: number) =>
  useDish(id)?.measurementUnit;
export const useDishMeasurementValue = (id: number) =>
  useDish(id)?.measurementValue;
export const useDishMeasurement = (id: number) =>
  (useDishMeasurementValue(id) ?? '') + (useDishMeasurementUnit(id) ?? '');
export const useDishPrice = (id: number) => useDish(id)?.price;
export const useDishSpicyLevel = (id: number) => useDish(id)?.spicyLevel;
export const useDishSpicy = (id: number) => (useDishSpicyLevel(id) ?? 0) > 0;
export const useDishLabels = (id: number) => useDish(id)?.labels;
export const useDishIngredients = (id: number) => useDish(id)?.ingredients;
export const useDisFeatured = (id: number) => useDish(id)?.featured;
export const useDishColorBorder = (id: number) => useDish(id)?.colorBorder;
export const useDishColor = (id: number) => useDish(id)?.color;
export const useDishSticker = (id: number) => useDish(id)?.sticker;
export const useDishImageUrls = (id: number) => useDish(id)?.imageUrls;
export const useDishThumbnailUrl = (id: number) => useDishImageUrls(id)?.[0];
export const useDishModelUrl = (id: number) => useDish(id)?.modelUrl;
export const useDishBookmarked = (id: number) => useBookmarks().includes(id);

// Order
export const useOrder = () => useStore().order();
export const useOrderedDishes = () => {
  const dishes = useDishes();
  const order = useOrder();

  return useMemo(
    () =>
      sortBy(
        compact(
          order.dishes.map(v => {
            const dish = dishes.find(d => v.id === d.id);
            if (dish == null) {
              return null;
            }

            return {
              id: v.id,
              count: v.count,
              finalized: v.finalized,
              thumbnailUrl: dish.imageUrls[0],
              name: dish.name,
              price: dish.price,
            };
          }),
        ),
        v => {
          return -v.price;
        },
      ).sort((a, b) => {
        if (a?.finalized && !b?.finalized) {
          return -1;
        }
        if (!a?.finalized && b?.finalized) {
          return 1;
        }
        return 0;
      }),
    [dishes, order],
  );
};
export const useNotFinalizedOrderDishes = () =>
  useOrderedDishes().filter(v => !v.finalized);
export const useHasNotFinalizedDishes = () =>
  useNotFinalizedOrderDishes().length > 0;
export const useOrderTableId = () => useOrder().tableId;
export const useOrderTableName = () => useOrder().tableName;
export const useOrderNotes = () => useOrder().notes;
export const useOrderPromo = () => useOrder().promo;
export const useOrderTotal = () => {
  const dishes = useOrderedDishes();
  return useMemo(
    () =>
      dishes.reduce(
        (accumulator, {price, count}) => accumulator + price * count,
        0,
      ),
    [dishes],
  );
};

// Misc
export const useOrderedDishCount = () => useStore().orderedDishCount();
export const useScreen = () => useStore().screen();
export const useIsDishScreen = () => useStore().isDishScreen();
