import React from 'react';
import {DishFooter as DishFooterBase} from '../../../components/_old/dish/DishFooter';
import {orderDish} from '../../../store/slice';
import {useDishId} from '../../dish/useDishId';
import {
  useDishPrice,
  useOrderedDishCount,
  useRestaurantCurrency,
} from '../../../store/selectors';

export const DishFooter = () => {
  const dishId = useDishId();
  const price = useDishPrice(useDishId()) ?? 0;
  const count = useOrderedDishCount();
  const sum = price * count;
  const currency = useRestaurantCurrency();

  const addToCart = () => orderDish(dishId, count);

  return (
    <DishFooterBase price={sum} currency={currency} onAddDish={addToCart} />
  );
};
