import {HeaderBookmarkButton, HeaderTitle} from '../components/top-bar';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {addBookmark, removeBookmark, setScreen} from '../store/slice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Arrow} from '../components/icons/Arrow';
import {
  useDishBookmarked,
  useIsDishScreen,
  useRestaurantName,
  useScreen,
} from '../store/selectors';

export const BackButton = () => {
  const nav = useNavigation();
  const order = useScreen() === 'order';
  const dish = useIsDishScreen();

  return (
    <TouchableOpacity
      hitSlop={{top: 32, bottom: 32, left: 32, right: 32}}
      onPress={() => {
        if (order) {
          if (dish) nav.goBack();
          else setScreen('menu');
        } else nav.goBack();
      }}>
      <Arrow />
    </TouchableOpacity>
  );
};

export const Bookmark = () => {
  const route = useRoute<any>();
  const dishId = route.params.dishId;
  const enabled = useDishBookmarked(dishId);

  return (
    <HeaderBookmarkButton
      enabled={enabled}
      onPress={() => (enabled ? removeBookmark(dishId) : addBookmark(dishId))}
    />
  );
};

export const Header = ({
  noBookmark,
  color,
}: {
  noBookmark?: boolean;
  color?: string;
}) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 26,
      paddingTop: useSafeAreaInsets().top + 25,
      backgroundColor: color ?? 'white',
    }}>
    <BackButton />
    <HeaderTitle value={useRestaurantName()} />
    {!noBookmark ? <Bookmark /> : <View style={{width: 21}}></View>}
  </View>
);
