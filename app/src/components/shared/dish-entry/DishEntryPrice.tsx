import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-family: Avenir;
  font-weight: 500;
  font-size: 16px;
  color: #b2b2b2;
`;

export const DishEntryPrice = ({value}: {value: number}) => (
  <StyledText>{value}$</StyledText>
);
