import {ReceiptFooter as Footer} from '../../components/receipt/ReceiptFooter';
import React from 'react';
import {
  useHasNotFinalizedDishes,
  useNotFinalizedOrderDishes,
  useOrderedDishes,
  useOrderNotes,
  useOrderPromo,
  useOrderTableId,
  useOrderTotal,
  useRestaurantCurrency,
} from '../../store/selectors';
import {useRestaurantId} from '../../navigators/MenuTabNavigator';
import {submitOrder} from '../../api/api';
import {finalizeOrder} from '../../store/slice';

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
    <Footer
      subTotal={Number(useOrderTotal().toFixed(2))} // TODO
      discount={0} // TODO
      promo={0} // TODO
      onOrder={order}
      orderDisabled={!useHasNotFinalizedDishes()}
    />
  );
};
