import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useHideNavBar, useShowNavBar} from '../components/NavBar';
import {useScreen} from '../store/selectors';
import {usePortrait} from '../lib/orientation';
import {useHideNotificationBarWhileInFocus} from '../components/notification-bar/NotificationBar';
import {setIsDishScreen} from '../store/slice';
import {DishLayout} from '../components/dish/DishLayout';
import {DishSlider} from '../containers/dish/DishSlider';
import {DishInfo} from '../containers/dish/DishInfo';
import {DishFooter} from '../containers/dish/DishFooter';

export const DishScreen = () => {
  const hideNavBar = useHideNavBar();
  const showNavBar = useShowNavBar();
  const order = useScreen() === 'order';

  usePortrait();
  useHideNotificationBarWhileInFocus();

  useFocusEffect(
    useCallback(() => {
      if (order) {
        return;
      }
      hideNavBar();
      return showNavBar;
    }, [hideNavBar, order, showNavBar]),
  );

  useFocusEffect(
    useCallback(() => {
      setIsDishScreen(true);
      return () => setIsDishScreen(false);
    }, []),
  );

  return <DishLayout Slider={DishSlider} Info={DishInfo} Footer={DishFooter} />;
};
