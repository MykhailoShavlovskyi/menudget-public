import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: red;
  font-weight: bold;
  font-size: 30px;
  margin-left: 8px;
`;

export const ArDishSpicyLevel = ({value}: {value: number}) => {
  let text = '';
  for (let i = 0; i < value; i++) text += 'I';

  return <StyledText>{text}</StyledText>;
};
