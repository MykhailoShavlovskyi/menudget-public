import styled from 'styled-components/native';
import React from 'react';
import {Button} from '../../common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {currencies} from '../../../lib/currencies';

const StyledContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  padding: 40px 55px;
  width: 100%;
  position: absolute;
`;

const StyledText = styled.Text`
  margin-left: -5px;
  font-family: Avenir;
  color: #ffbd02;
  font-size: 26px;
  font-weight: 500;
`;

export const DishFooter = ({
  price,
  currency,
  onAddDish,
}: {
  price: string | number;
  currency: string | number;
  onAddDish: () => void;
}) => (
  <StyledContainer style={{paddingBottom: useSafeAreaInsets().bottom}}>
    <StyledText>
      {Number(price).toFixed(2)}
      {currencies[currency] ?? '$'}
    </StyledText>
    <Button onPress={onAddDish} title="Add to card" />
  </StyledContainer>
);
