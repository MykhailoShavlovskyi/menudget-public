import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {DishScreen} from '../screens/DishScreen';
import {Screen} from '../lib/Screen';
import {Header} from '../containers/Header';
import {BookMarksScreen} from '../screens/BookMarksScreen';

type ParamList = {
  Default: undefined;
  Bookmarks: undefined;
  Dish: {dishId: number};
};
type DishProps = NativeStackScreenProps<ParamList, 'Dish'>;
export type DishNavigation = DishProps['navigation'];

const BookmarksStack = createNativeStackNavigator();

export const BookmarksStackNavigator = memo(() => (
  <BookmarksStack.Navigator>
    <BookmarksStack.Screen
      name={Screen.Bookmarks}
      component={BookMarksScreen}
      options={{headerShown: false}}
    />
    <BookmarksStack.Screen
      name={Screen.Dish}
      component={DishScreen}
      options={{header: () => <Header />}}
    />
  </BookmarksStack.Navigator>
));
