import React from 'react';
import {StyledDishNameText} from '../../../shared/DishInfo';
import styled from 'styled-components/native';

const StyledText = styled(StyledDishNameText)`
  color: white;
`;

export const ArDishName = ({value}: {value: string}) => (
  <StyledText>{value}</StyledText>
);
