import React, {useMemo} from 'react';
import {MenuCategories} from '../../../components/menu/dishes/MenuCategories';
import {DishCard} from '../../../components/_old/menu/dish/DishCard';
import {MenuDishes} from '../../../components/_old/menu/MenuDishes';
import {
  orderDish,
  setCategory,
  setOrderedDishCount,
} from '../../../store/slice';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {
  useDish,
  useDishColor,
  useDishColorBorder,
  useDishDescription,
  useDishMeasurement,
  useDishName,
  useDishPrice,
  useDishSpicyLevel,
  useDishSticker,
  useDishThumbnailUrl,
  useDisplayedCategoryDishes,
  useDisplayedMenuCategory,
  useFilteredDishesCategories,
  useMenuCategory,
  useMenuFetched,
  useRestaurantCurrency,
} from '../../../store/selectors';

const Categories = () => (
  <MenuCategories
    loading={!useMenuFetched()}
    categories={useFilteredDishesCategories()}
    selected={useDisplayedMenuCategory()}
    onChange={setCategory}
  />
);

const Dish = ({id}: {id: number}) => {
  const navigation = useNavigation();
  const openDish = () => {
    setOrderedDishCount(1);
    return (navigation as any).navigate('Dish', {dishId: id});
  };
  const addDish = () => orderDish(id, 1);

  return (
    <DishCard
      measurement={useDishMeasurement(id)}
      thumbnailUrl={useDishThumbnailUrl(id)}
      name={useDishName(id) ?? ''}
      description={useDishDescription(id) ?? ''}
      colorBorder={useDishColorBorder(id) ?? false}
      color={useDishColor(id) ?? ''}
      price={useDishPrice(id) ?? 0}
      currency={useRestaurantCurrency()}
      sticker={useDishSticker(id) ?? null}
      spicyLevel={useDishSpicyLevel(id) ?? 0}
      onPress={openDish}
      onAdd={addDish}
    />
  );
};

const Dishes = () => {
  const dishes = useDisplayedCategoryDishes();

  const stacks = useMemo(() => {
    if (dishes.length == 2) {
      return [
        <Dish key={dishes[0].id} id={dishes[0].id} />,
        <Dish key={dishes[1].id} id={dishes[1].id} />,
      ];
    }

    const stacks = [];
    for (let i = 0; i < dishes.length; i += 2) {
      const a = dishes[i];
      const b = dishes[i + 1];
      stacks.push(
        <View key={`stack-${i}`}>
          {a && <Dish id={a.id} />}
          {b && <Dish id={b.id} />}
        </View>,
      );
    }

    return stacks;
  }, [dishes]);

  return (
    <MenuDishes
      loading={!useMenuFetched()}
      category={useMenuCategory()}
      dishes={stacks}
    />
  );
};

export const MenuItems = () => (
  <>
    <Categories />
    <Dishes />
  </>
);
