import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  top: -51px;
  color: #b2b2b2;
  font-family: Avenir;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const StyledSkeleton = styled.View`
  top: -51px;
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 80px;
  height: 18px;
`;

export const RestaurantOpeningTime = ({
  loading,
  openingTime,
  closingTime,
}: {
  loading: boolean;
  openingTime: number;
  closingTime: number;
}) => {
  let openingMinutes: string | number = openingTime % 1;
  if (openingMinutes < 10) openingMinutes = '0' + openingMinutes;

  let openingHours: string | number = openingTime - (openingTime % 1);
  if (openingHours < 10) openingHours = '0' + openingHours;

  let closingMinutes: string | number = closingTime % 1;
  if (closingMinutes < 10) closingMinutes = '0' + closingMinutes;

  let closingHours: string | number = closingTime - (closingTime % 1);
  if (closingHours < 10) closingHours = '0' + closingHours;

  const time = `${openingHours}:${openingMinutes}-${closingHours}:${closingMinutes}`;

  if (loading) return <StyledSkeleton />;
  return <StyledText>{time}</StyledText>;
};
