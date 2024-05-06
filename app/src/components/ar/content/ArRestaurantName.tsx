import React from 'react';
import styled from 'styled-components/native';
import {RestaurantName} from '../../shared/RestaurantName';

const StyledRestaurantName = styled(RestaurantName)`
  color: white;
  max-width: 144px;
  text-align: center;

  margin-top: 1px;
  margin-right: -1px;
`;

export const ArRestaurantName = ({value}: {value: string}) => (
  <StyledRestaurantName value={value} />
);
