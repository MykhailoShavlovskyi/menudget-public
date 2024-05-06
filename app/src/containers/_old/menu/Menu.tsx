import {MenuFilter} from '../../menu/MenuFilters';
import React from 'react';
import {MenuItems} from './MenuItems';
import {useMenuFilter} from '../../../store/selectors';

export const Menu = () => (useMenuFilter() ? <MenuFilter /> : <MenuItems />);
