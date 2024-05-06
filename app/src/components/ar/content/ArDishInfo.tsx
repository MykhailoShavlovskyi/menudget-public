import {ArDishMeasurement} from './info/ArDishMeasurement';
import {ArDishName} from './info/ArDishName';
import {ArDishSpicyLevel} from './info/ArDishSpicyLevel';
import {ArDishDescription} from './info/ArDishDescription';
import React from 'react';
import styled from 'styled-components/native';

import {Dish} from '../../../store/models';

const StyledContainer = styled.View`
  max-width: 30%;
  justify-content: flex-end;
`;

const StyledNameAndSpicyContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ArDishInfo = ({
  name,
  description,
  measurement,
  spicyLevel,
}: Pick<Dish, 'name' | 'description' | 'spicyLevel'> & {
  measurement: string;
}) => (
  <StyledContainer>
    <ArDishMeasurement value={measurement} />
    <StyledNameAndSpicyContainer>
      <ArDishName value={name} />
      <ArDishSpicyLevel value={spicyLevel} />
    </StyledNameAndSpicyContainer>
    <ArDishDescription value={description} />
  </StyledContainer>
);
