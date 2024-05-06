import {ReceiptDishes as Dishes} from '../../components/receipt/ReceiptDishes';
import React from 'react';
import {ReceiptDish} from '../../components/receipt/ReceiptDish';
import {useOrderedDishes} from '../../store/selectors';
import {orderDish, removeOrderedDish} from '../../store/slice';
import {noop} from 'lodash';

export const ReceiptDishes = () => {
  return (
    <Dishes
      dishes={[
        ...useOrderedDishes().map(
          ({id, name, price, thumbnailUrl, count, finalized}) => (
            <ReceiptDish
              key={`ordered-${id}`}
              name={name}
              basePrice={price}
              price={price}
              thumbnailUrl={thumbnailUrl}
              count={count}
              finalized={finalized}
              onIncrease={() => orderDish(id, 1)}
              onDecrease={() => removeOrderedDish(id)}
            />
          ),
        ),
        /*    <ReceiptDish
          name={'Lasagna al Forno'}
          basePrice={17.99}
          price={13.99}
          thumbnailUrl={undefined}
          count={1}
          finalized={false}
          onIncrease={noop}
          onDecrease={noop}
        />,
        <ReceiptDish
          name={'Lasagna al Forno'}
          basePrice={17.99}
          price={17.99}
          thumbnailUrl={undefined}
          count={1}
          finalized={false}
          onIncrease={noop}
          onDecrease={noop}
        />,
        <ReceiptDish
          name={'Lasagna al Forno'}
          basePrice={17.99}
          price={17.99}
          thumbnailUrl={undefined}
          count={5}
          finalized={false}
          onIncrease={noop}
          onDecrease={noop}
        />,*/
      ]}
    />
  );
};
