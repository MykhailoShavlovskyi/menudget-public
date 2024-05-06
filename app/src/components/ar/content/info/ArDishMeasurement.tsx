import React from 'react';
import {StyledDishMeasurementText} from '../../../shared/DishInfo';
import styled from 'styled-components/native';

const StyledText = styled(StyledDishMeasurementText)`
  color: white;
`;

export const ArDishMeasurement = ({value}: {value: string}) => (
  <StyledText>{value}</StyledText>
);
