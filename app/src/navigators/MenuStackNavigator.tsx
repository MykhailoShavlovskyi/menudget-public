import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {MenuScreen} from '../screens/MenuScreen';
import {DishScreen} from '../screens/DishScreen';
import {Screen} from '../lib/Screen';
import {Header} from '../containers/Header';

type ParamList = {
  Default: undefined;
  Menu: undefined;
  Dish: {dishId: number};
};
type StackProps = NativeStackScreenProps<ParamList, 'Default'>;
export type MenuStackNavigation = StackProps['navigation'];

const MenuStack = createNativeStackNavigator();

export const MenuStackNavigator = memo(() => (
  <MenuStack.Navigator>
    <MenuStack.Screen
      name={Screen.MenuStack}
      component={MenuScreen}
      options={{headerShown: false}}
    />
    <MenuStack.Screen
      name={Screen.Dish}
      component={DishScreen}
      options={{header: () => <Header />}}
    />
  </MenuStack.Navigator>
));
