import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: black;
  margin-left: 4px;
`;

export const DishEntryCount = ({count}: {count: number}) => (
  <StyledText>{count}x</StyledText>
);
