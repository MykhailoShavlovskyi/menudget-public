import React from 'react';
import {DishCounter} from '../../../components/_old/dish/DishCounter';
import {DishLabels} from '../../../components/_old/dish/extra-info/DishLabels';
import {DishSpicyLevel} from '../../../components/_old/dish/extra-info/DishSpicyLevel';
import {DishIngredients} from '../../../components/_old/dish/extra-info/DishIngredients';
import {DishInfo as DishInfoBase} from '../../../components/_old/dish/DishInfo';
import {setOrderedDishCount} from '../../../store/slice';
import {useDishId} from '../../dish/useDishId';
import {
  useDishDescription,
  useDishIngredients,
  useDishLabels,
  useDishMeasurement,
  useDishName,
  useDishSpicyLevel,
  useOrderedDishCount,
} from '../../../store/selectors';

const Counter = () => (
  <DishCounter value={useOrderedDishCount()} onChange={setOrderedDishCount} />
);

const SpicyLevel = () => (
  <DishSpicyLevel value={useDishSpicyLevel(useDishId()) ?? 0} />
);
const Labels = () => <DishLabels labels={useDishLabels(useDishId()) ?? []} />;
const Ingredients = () => (
  <DishIngredients ingredients={useDishIngredients(useDishId()) ?? ''} />
);
const ExtraInfo = () => (
  <>
    <SpicyLevel />
    <Labels />
    <Ingredients />
  </>
);

export const DishInfo = () => (
  <DishInfoBase
    name={useDishName(useDishId()) ?? ''}
    description={useDishDescription(useDishId()) ?? ''}
    measurement={useDishMeasurement(useDishId()) ?? ''}
    Counter={Counter}
    ExtraInfo={ExtraInfo}
  />
);
