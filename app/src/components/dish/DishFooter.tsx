import styled from 'styled-components/native';
import {Button} from '../common/Button';
import {currencies} from '../../lib/currencies';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StyledContainer = styled.View`
  position: absolute;
  width: 100%;
  margin-bottom: 9px;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 16px 16px 0 47px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const StyledPrice = styled.Text`
  font-family: Avenir;
  font-size: 24px;
  font-weight: bold;
`;

const StyledButton = styled(Button)``;

export const DishFooter = ({
  price,
  currency,
  onAddToCard,
}: {
  price: number;
  currency: string;
  onAddToCard: () => void;
}) => (
  <StyledContainer style={{paddingBottom: useSafeAreaInsets().bottom}}>
    <StyledPrice>
      {price}
      {currencies[currency] ?? '$'}
    </StyledPrice>
    <StyledButton
      buttonStyle={{width: 194, height: 48}}
      textStyle={{
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 0,
      }}
      title={'Add to card'}
      onPress={onAddToCard}
    />
  </StyledContainer>
);
