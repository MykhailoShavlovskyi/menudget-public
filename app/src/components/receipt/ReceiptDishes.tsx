import React, {ReactNode} from 'react';
import {NoContent} from '../common/NoContent';
import styled from 'styled-components/native';
import {StyledSplitter} from './ReceiptLayout';
import {View} from 'react-native';

const RestyledSplitter = styled(StyledSplitter)`
  margin-top: 6px;
`;

export const ReceiptDishes = ({dishes}: {dishes: ReactNode[]}) => {
  return dishes.length !== 0 ? (
    <View>
      <StyledSplitter />
      {dishes}
      <RestyledSplitter />
    </View>
  ) : (
    <NoContent message="No dishes selected" />
  );
};
