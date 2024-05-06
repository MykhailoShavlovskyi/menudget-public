import styled from 'styled-components/native';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderTitle} from '../top-bar';

const StyledHeading1 = styled.Text`
  font-family: Avenir;
  font-size: 21px;
  font-weight: 900;
  text-align: center;
`;

const StyledHeading2 = styled.Text`
  font-family: Avenir;
  font-size: 27px;
  font-weight: 900;
  text-align: center;
`;

const StyledDishesContainer = styled.ScrollView`
  flex: 1;
  padding: 15px 32px;
`;

export const BookmarksLayout = ({Dishes}: {Dishes: () => JSX.Element}) => (
  <View
    style={{
      flex: 1,
      paddingTop: useSafeAreaInsets().top,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
    }}>
    <StyledHeading1>Restaurant de la cruz</StyledHeading1>
    <StyledHeading2>Bookmarks</StyledHeading2>
    <StyledDishesContainer nestedScrollEnabled>
      <Dishes />
    </StyledDishesContainer>
  </View>
);
