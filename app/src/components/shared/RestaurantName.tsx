import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-family: Avenir;
  font-weight: 900;
  font-size: 21px;
  line-height: 27px;
  letter-spacing: -0.1px;
`;

const StyledSkeleton1 = styled.View`
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 160px;
  height: 20px;
  margin-bottom: 9px;
`;

const StyledSkeleton2 = styled.View`
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 140px;
  height: 20px;
`;

export const RestaurantName = ({
  value,
  loading,
  ...rest
}: {
  loading?: boolean;
  value?: string;
}) =>
  loading ? (
    <>
      <StyledSkeleton1 />
      <StyledSkeleton2 />
    </>
  ) : (
    <StyledText {...rest}>Restaurant {value}</StyledText>
  );
