import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  width: 100%;
  text-align: center;
  font-weight: bold;
  margin-top: 4px;
  margin-bottom: 5px;
  font-size: 18px;
  letter-spacing: -0.5px;

  font-family: Avenir;
  font-weight: 900;
`;

export const DishName = ({value}: {value: string}) => (
  <StyledText numberOfLines={1}>{value}</StyledText>
);
