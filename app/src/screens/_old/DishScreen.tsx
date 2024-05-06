import React, {useCallback} from 'react';
import {DishLayout} from '../../components/_old/dish/DishLayout';
import {DishSlider} from '../../containers/_old/dish/DishSlider';
import {DishInfo} from '../../containers/_old/dish/DishInfo';
import {DishFooter} from '../../containers/_old/dish/DishFooter';
import {useHideNavBar, useShowNavBar} from '../../components/NavBar';
import {useFocusEffect} from '@react-navigation/native';
import {setIsDishScreen} from '../../store/slice';
import {usePortrait} from '../../lib/orientation';
import {useScreen} from '../../store/selectors';
import {useHideNotificationBarWhileInFocus} from '../../components/notification-bar/NotificationBar';

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
