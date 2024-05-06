import React, {useEffect} from 'react';
import {MenuCategories} from '../../components/menu/dishes/MenuCategories';
import {MenuDishes} from '../../components/_old/menu/MenuDishes';
import {orderDish, setCategory, setOrderedDishCount} from '../../store/slice';
import {useNavigation} from '@react-navigation/native';
import {
  useDishColor,
  useDishColorBorder,
  useDishDescription,
  useDishMeasurement,
  useDishName,
  useDishPrice,
  useDishSpicy,
  useDishSticker,
  useDishThumbnailUrl,
  useDisplayedCategoryDishes,
  useDisplayedMenuCategory,
  useFilteredDishesCategories,
  useMenuCategory,
  useMenuFetched,
  useRestaurantCurrency,
} from '../../store/selectors';
import {DishCard} from '../../components/menu/dishes/DishCard';
import {noop} from 'lodash';

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
      spicy={useDishSpicy(id) ?? 0}
      vegetarian={false} /*TODO*/
      vegan={false} /*TODO*/
      allergens={false} /*TODO*/
      sticker={useDishSticker(id) ?? null}
      onPress={openDish}
      onAdd={addDish}
    />
  );
};

const Dishes = () => {
  /* const navigation = useNavigation();
  const a = useDisplayedCategoryDishes();
  useEffect(() => {
    if (a[0] != null) {
      setOrderedDishCount(1);
      return (navigation as any).navigate('Dish', {: a[0].id});
    }
  }, [a, navigation]);*/

  return (
    <MenuDishes
      loading={!useMenuFetched()}
      category={useMenuCategory()}
      dishes={[
        ...useDisplayedCategoryDishes().map(({id}) => (
          <Dish id={id} key={id} />
        )),
        /*<DishCard
              measurement={'300gr'}
              thumbnailUrl={undefined}
              name={'Lasagna al Forno'}
              description={
                'Layers of homemade pasta, Bolognese sause, bechamel and melted cheese, baked to perfection'
              }
              colorBorder={false}
              color={'black'}
              price={17.99}
              currency={useRestaurantCurrency()}
              spicy={true}
              vegetarian={false} /!*TODO*!/
              vegan={true} /!*TODO*!/
              allergens={true} /!*TODO*!/
              sticker={'chef'}
              onPress={noop}
              onAdd={noop}
            />,
            <DishCard
              measurement={'300gr'}
              thumbnailUrl={undefined}
              name={'Lasagna al Forno'}
              description={
                'Layers of homemade pasta, Bolognese sause, bechamel and melted cheese, baked to perfection'
              }
              colorBorder={false}
              color={'black'}
              price={17.99}
              currency={useRestaurantCurrency()}
              spicy={true}
              vegetarian={false} /!*TODO*!/
              vegan={true} /!*TODO*!/
              allergens={true} /!*TODO*!/
              sticker={null}
              onPress={noop}
              onAdd={noop}
            />,
            <DishCard
              measurement={'300gr'}
              thumbnailUrl={undefined}
              name={'Lasagna al Forno'}
              description={
                'Layers of homemade pasta, Bolognese sause, bechamel and melted cheese, baked to perfection'
              }
              colorBorder={true}
              color={'orange'}
              price={17.99}
              currency={useRestaurantCurrency()}
              spicy={true}
              vegetarian={false} /!*TODO*!/
              vegan={true} /!*TODO*!/
              allergens={true} /!*TODO*!/
              sticker={null}
              onPress={noop}
              onAdd={noop}
            />,*/
      ]}
    />
  );
};

export const MenuItems = () => (
  <>
    <Categories />
    <Dishes />
  </>
);
