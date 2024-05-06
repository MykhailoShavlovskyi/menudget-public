import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex-direction: row;
  width: 102%;
  margin-top: 6px;
  height: 50px;
`;

const StyledText = styled.Text`
  font-family: Avenir;
  font-weight: 500;
  font-size: 13.5px;
  color: #b2b2b2;

  flex: 1;
  line-height: 14px;
  padding-top: 4px;
  padding-left: 1px;
  margin-left: 1px;
`;

const StyledSkeleton1 = styled.View`
  margin-top: 13px;
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 185px;
  height: 12px;
  margin-bottom: 4px;
`;

const StyledSkeleton2 = styled.View`
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 140px;
  height: 12px;
`;

export const RestaurantDescription = ({
  loading,
  value,
}: {
  loading: boolean;
  value?: string;
}) =>
  loading ? (
    <>
      <StyledSkeleton1 />
      <StyledSkeleton2 />
    </>
  ) : (
    <StyledContainer>
      <StyledText>{value}</StyledText>
    </StyledContainer>
  );
