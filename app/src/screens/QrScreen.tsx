import React, {memo, useCallback} from 'react';
import {RootStackNavigation} from '../navigators/RootStackNavigator';
import {MenuTabNavigation} from '../navigators/MenuTabNavigator';
import {getMenu} from '../api/api';
import {menuRetrieved, setScreen} from '../store/slice';
import {ScannerLayout} from '../components/qr/ScannerLayout';
import {useHideNavBarWhileInFocus} from '../components/NavBar';
import {usePortrait} from '../lib/orientation';
import {useHideNotificationBarWhileInFocus} from '../components/notification-bar/NotificationBar';

export const QrScreen = memo(
  ({navigation}: {navigation?: RootStackNavigation | MenuTabNavigation}) => {
    useHideNavBarWhileInFocus();
    useHideNotificationBarWhileInFocus();
    usePortrait();

    // Handle dev scan
    const handleDevScan = useCallback(() => {
      const restaurantId = 3;
      const tableId = 3;

      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Menu', params: {restaurantId}}],
        });
      } else {
        setScreen('menu');
      }

      void getMenu(restaurantId, tableId).then(menuRetrieved);
    }, []);

    // Handle scan
    const handleScan = useCallback((restaurantId: number, tableId: number) => {
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Menu', params: {restaurantId}}],
        });
      } else {
        setScreen('menu');
      }

      void getMenu(restaurantId, tableId).then(menuRetrieved);
    }, []);

    return <ScannerLayout onDevScan={handleDevScan} onScan={handleScan} />;
  },
);
