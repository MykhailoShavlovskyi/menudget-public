import styled from 'styled-components/native';
import React from 'react';

const StyledText = styled.Text`
  font-family: Avenir;
  font-weight: bold;
  font-size: 15px;
  color: black;
  letter-spacing: 0.1px;

  line-height: 22px;
`;

export const DishInfoLabel = ({value, ...rest}: {value: string}) => (
  <StyledText {...rest}>{`${value} `}</StyledText>
);
