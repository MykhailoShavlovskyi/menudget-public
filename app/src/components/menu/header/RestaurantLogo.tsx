import styled from 'styled-components/native';
import React from 'react';

export const RestaurantLogoContainer = styled.View`
  position: relative;
  width: 115px;
  height: 115px;
`;

export const RestaurantLogoBackground = styled.View`
  border-radius: 115px;
  width: 115px;
  height: 115px;
  border-width: 10px;
  top: -55px;
  border-color: white;
  position: absolute;
  background-color: #e3e3e3;
`;

export const StyledRestaurantLogo = styled.Image`
  border-radius: 115px;
  width: 115px;
  height: 115px;
  resize-mode: cover;
  border-width: 10px;
  top: -55px;
  border-color: white;
  position: absolute;
`;

export const StyledRestaurantLogoSkeleton = styled.View`
  top: -55px;
  width: 115px;
  height: 115px;
  border-radius: 115px;
  background-color: #e3e3e3;
  border-width: 10px;
  border-color: white;
`;

export const RestaurantLogo = ({
  loading,
  uri,
}: {
  loading: boolean;
  uri?: string;
}) =>
  loading ? (
    <StyledRestaurantLogoSkeleton />
  ) : (
    <RestaurantLogoContainer>
      <RestaurantLogoBackground />
      <StyledRestaurantLogo
        source={
          uri ? {uri} : require('../../../../assets/images/placeholder.png')
        }
      />
    </RestaurantLogoContainer>
  );
