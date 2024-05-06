import React from 'react';
import {useMenuFilter} from '../../store/selectors';
import {MenuFilter} from './MenuFilters';
import {MenuItems} from './MenuItems';

export const Menu = () => (useMenuFilter() ? <MenuFilter /> : <MenuItems />);
