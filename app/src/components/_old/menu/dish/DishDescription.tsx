import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  flex-shrink: 1;
  text-align: center;
  margin-bottom: 6px;

  color: #b2b2b2;

  font-family: Avenir;
  font-weight: normal;
  font-size: 11px;
  margin: 0 5px;
  line-height: 11px;
  padding-top: 5px;
`;

export const DishDescription = ({value}: {value: string}) => (
  <StyledText numberOfLines={3}>{value}</StyledText>
);
