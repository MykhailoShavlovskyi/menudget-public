import {DishInfo as Info} from '../../components/dish/DishInfo';
import React from 'react';
import {
  useDishDescription,
  useDishIngredients,
  useDishLabels,
  useDishMeasurement,
  useDishName,
  useDishSpicyLevel,
} from '../../store/selectors';
import {useDishId} from './useDishId';

export const DishInfo = () => (
  <Info
    name={useDishName(useDishId()) ?? ''}
    labels={
      useDishLabels(useDishId())?.filter(
        v => v === 'Vegan' || v === 'Vegetarian' || v === 'Spicy', // TODO
      ) ?? []
    }
    description={useDishDescription(useDishId()) ?? ''}
    measurement={useDishMeasurement(useDishId()) ?? ''}
    ingredients={useDishIngredients(useDishId()) ?? ''}
    spicyLevel={useDishSpicyLevel(useDishId()) ?? 0}
    allergens={'gluten, lactose, meat, eggs'} // TODO
    calories={298} // TODO
    protein={5} // TODO
    fat={19} // TODO
    carbs={26} // TODO
  />
);
