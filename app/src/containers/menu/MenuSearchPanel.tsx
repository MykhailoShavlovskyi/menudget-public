import {MenuSearchPanel as MenuSearchPanelBase} from '../../components/menu/search/MenuSearchPanel';
import React from 'react';
import {setFilter, setSearch} from '../../store/slice';
import {useMenuFilter, useMenuSearch} from '../../store/selectors';

export const MenuSearchPanel = () => (
  <MenuSearchPanelBase
    search={useMenuSearch()}
    filter={useMenuFilter()}
    onSearchChange={setSearch}
    onFilterChange={setFilter}
  />
);
