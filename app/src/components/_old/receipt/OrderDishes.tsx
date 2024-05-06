import React, {ReactNode, useMemo} from 'react';
import {NoContent} from '../../common/NoContent';

export const OrderDishes = ({dishes}: {dishes: ReactNode[]}) => {
  const hasContent = useMemo(() => dishes.length !== 0, [dishes.length]);

  return hasContent ? (
    <>{dishes}</>
  ) : (
    <NoContent message="No dishes selected" />
  );
};
