import {DishFooter as Footer} from '../../components/dish/DishFooter';
import {noop} from 'lodash';
import React from 'react';

export const DishFooter = () => (
  <Footer price={17.99} currency={'usd'} onAddToCard={noop} />
);
