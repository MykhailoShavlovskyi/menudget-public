import React from 'react';
import styled from 'styled-components/native';
import {currencies} from '../../../../lib/currencies';

const StyledView = styled.View<{noSpicyLevel: boolean}>`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-bottom: 3px;
  ${(p: any) => (p.noSpicyLevel ? '' : 'margin-right: 5px;')}
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 17px;
  font-family: Avenir;
  font-weight: 900;
`;

// Dish price
export const DishPrice = ({
  value,
  currency,
  noSpicyLevel,
}: {
  value: number;
  currency: string;
  noSpicyLevel: boolean;
}) => (
  <StyledView noSpicyLevel={noSpicyLevel}>
    <StyledText>
      {value}
      {currencies[currency] ?? '$'}
    </StyledText>
  </StyledView>
);
