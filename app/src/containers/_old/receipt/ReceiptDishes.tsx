import React from 'react';
import {removeOrderedDish} from '../../../store/slice';
import {OrderDishes} from '../../../components/_old/receipt/OrderDishes';
import {DishEntry} from '../../../components/shared/dish-entry/DishEntry';
import {useOrderedDishes} from '../../../store/selectors';

export const ReceiptDishes = () => {
  return (
    <OrderDishes
      dishes={useOrderedDishes().map(
        ({id, name, price, thumbnailUrl, count, finalized}) => (
          <DishEntry
            key={`ordered-${id}`}
            name={name}
            price={price}
            thumbnailUrl={thumbnailUrl}
            count={count}
            cantRemove={finalized}
            onPress={() => {
              // TODO
              //setOrderedDishCount(1);
              //navigation.navigate('Dish', {dishId: id});
            }}
            onRemove={() => removeOrderedDish(id)}
          />
        ),
      )}
    />
  );
};
