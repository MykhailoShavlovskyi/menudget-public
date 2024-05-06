import React from 'react';
import {MenuLayout} from '../components/menu/MenuLayout';
import {
  RestaurantBanner,
  RestaurantHeader,
} from '../containers/menu/RestaurantHeader';
import {MenuSearchPanel} from '../containers/menu/MenuSearchPanel';
import {usePortrait} from '../lib/orientation';
import {useUserLoggedIn} from '../store/selectors';
import {Menu} from '../containers/menu/Menu';

export const MenuScreen = () => {
  usePortrait();

  return (
    <>
      <MenuLayout
        Banner={RestaurantBanner}
        Header={RestaurantHeader}
        Search={MenuSearchPanel}
        Menu={Menu}
        noHeader={useUserLoggedIn()}
      />
      {/*  <DesignScreen screen={16} />*/}
    </>
  );
};
