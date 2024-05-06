import React from 'react';
import {StyledDishDescriptionText} from '../../../shared/DishInfo';
import styled from 'styled-components/native';

const StyledText = styled(StyledDishDescriptionText)`
  padding-top: 2px;
  margin-top: -2px;
  color: white;
`;

export const ArDishDescription = ({value}: {value: string}) => (
  <StyledText>{value}</StyledText>
);
