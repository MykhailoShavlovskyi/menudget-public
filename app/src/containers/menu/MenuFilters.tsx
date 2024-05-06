import {MenuFilters as MenuFiltersBase} from '../../components/menu/filters/MenuFilters';
import {LabelGroup} from '../../components/menu/filters/LabelGroup';
import React from 'react';
import {SpicyLevelSlider} from '../../components/menu/filters/SpicyLevelSlider';
import {
  addFilterCategory,
  addFilterLabel,
  removeFilterCategory,
  removeFilterLabel,
  resetFilter,
  setFilter,
  setSpicyLevelFilter,
} from '../../store/slice';
import {View} from 'react-native';
import {
  useDishesCategories,
  useDishesLabels,
  useMenuFilterCategories,
  useMenuFilterLabels,
  useMenuFilterSpicyLevel,
} from '../../store/selectors';

const CategoryFilter = () => (
  <LabelGroup
    header={'Dishes / Menu'}
    labels={useDishesCategories()}
    selected={useMenuFilterCategories()}
    onAdd={addFilterCategory}
    onRemove={removeFilterCategory}
  />
);
const LabelFilter = () => (
  <LabelGroup
    header={'Diets / Special'}
    labels={useDishesLabels()}
    selected={useMenuFilterLabels()}
    onAdd={addFilterLabel}
    onRemove={removeFilterLabel}
  />
);
const SpicySlider = () => (
  <SpicyLevelSlider
    value={useMenuFilterSpicyLevel()}
    onChange={setSpicyLevelFilter}
  />
);

export const MenuFilter = () => (
  <MenuFiltersBase
    filters={
      <>
        <CategoryFilter />
        <SpicySlider />
        <View style={{height: 11}} />
        <LabelFilter />
      </>
    }
    onSave={() => setFilter(false)}
    onReset={() => resetFilter(false)}
  />
);
