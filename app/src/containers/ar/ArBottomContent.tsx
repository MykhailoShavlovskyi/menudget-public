import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ArRoute} from '../../navigators/RootStackNavigator';
import {orderDish} from '../../store/slice';
import {ArDishInfo} from '../../components/ar/content/ArDishInfo';
import {ArAddToCard} from '../../components/ar/content/ArAddToCard';
import {
  useDishDescription,
  useDishMeasurement,
  useDishName,
  useDishPrice,
  useDishSpicyLevel,
  useRestaurantCurrency,
} from '../../store/selectors';

const DishInfo = () => {
  const dishId = useRoute<ArRoute>().params.dishId;
  return (
    <ArDishInfo
      name={useDishName(dishId) ?? ''}
      measurement={useDishMeasurement(dishId) ?? 0}
      spicyLevel={useDishSpicyLevel(dishId) ?? 0}
      description={useDishDescription(dishId) ?? ''}
    />
  );
};

const AddToCard = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const {dishId, count} = useRoute<ArRoute>().params;
  const price = useDishPrice(dishId) ?? 0;
  const sum = price * count;
  const currency = useRestaurantCurrency();

  const addToCart = () => {
    if (addedToCart) return;
    orderDish(dishId, count);
    setAddedToCart(true);
  };

  return (
    <ArAddToCard
      price={sum}
      currency={currency}
      disabled={addedToCart}
      onAdd={addToCart}
    />
  );
};

export const ArBottomContent = () => (
  <>
    <DishInfo />
    <AddToCard />
  </>
);
