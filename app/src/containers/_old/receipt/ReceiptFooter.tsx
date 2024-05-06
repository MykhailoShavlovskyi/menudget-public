import React from 'react';
import {AddToCard} from '../../../components/shared/AddToCard';
import {finalizeOrder} from '../../../store/slice';
import {submitOrder} from '../../../api/api';
import {useRestaurantId} from '../../../navigators/MenuTabNavigator';
import {
  useNotFinalizedOrderDishes,
  useOrderedDishes,
  useOrderNotes,
  useOrderPromo,
  useOrderTableId,
  useOrderTotal,
  useRestaurantCurrency,
} from '../../../store/selectors';

export const ReceiptFooter = () => {
  const restaurantId = useRestaurantId();
  const tableId = useOrderTableId();
  const dishes = useOrderedDishes();
  const notFinalizedDishes = useNotFinalizedOrderDishes();
  const notes = useOrderNotes();
  const promo = useOrderPromo();
  const total = useOrderTotal();
  const currency = useRestaurantCurrency();
  const cantOrder = !dishes.some(v => !v.finalized);

  const order = () => {
    if (restaurantId == null || tableId == null) return;
    void submitOrder({
      restaurantId,
      dishes: notFinalizedDishes.map(({id, count}) => ({dishId: id, count})),
      tableId,
      notes,
      promo,
    });
    finalizeOrder();
  };

  return (
    <AddToCard
      price={total}
      currency={currency}
      onAdd={order}
      disabled={cantOrder}
    />
  );
};
