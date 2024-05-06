import React from 'react';
import {BookmarksDishes as BookmarksDishesBase} from '../../components/bookmarks/BookmarksDishes';
import {removeBookmark, setOrderedDishCount} from '../../store/slice';
import {DishEntry} from '../../components/shared/dish-entry/DishEntry';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {DishNavigation} from '../../navigators/BookmarksStackNavigator';
import {Splitter} from '../../components/common/Splitter';
import {
  useBookmarks,
  useDishName,
  useDishPrice,
  useDishThumbnailUrl,
} from '../../store/selectors';

const StyledDish = styled(DishEntry)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Dish = ({id}: {id: number}) => {
  const navigation = useNavigation<DishNavigation>();
  return (
    <>
      <StyledDish
        name={useDishName(id) ?? ''}
        price={useDishPrice(id) ?? 0}
        thumbnailUrl={
          useDishThumbnailUrl(id) ?? 'https://picsum.photos/200/300'
        }
        noRemoveBtn={true}
        onPress={() => {
          setOrderedDishCount(1);
          navigation.navigate('Dish', {dishId: id});
        }}
        onRemove={() => removeBookmark(id)}
      />
      <Splitter />
    </>
  );
};

export const BookmarksDishes = () => (
  <BookmarksDishesBase
    dishes={useBookmarks().map(id => (
      <Dish key={id} id={id} />
    ))}
  />
);
