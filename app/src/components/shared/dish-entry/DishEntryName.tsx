import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: black;
  font-family: Avenir;
  font-weight: 900;
  font-size: 16px;
  flex: 1;
  letter-spacing: -0.3px;
`;

export const DishEntryName = ({value}: {value: string}) => (
  <StyledText>{value}</StyledText>
);
