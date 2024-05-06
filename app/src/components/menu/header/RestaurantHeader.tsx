import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex-direction: row;
  margin: 0 14px 0 24px;
  height: 108px;
`;

const StyledLogoContainer = styled.View`
  align-items: center;
`;

const StyledTextContainer = styled.View`
  padding: 16px 13px 0 12px;
  flex: 1;
`;

export const RestaurantHeader = ({
  Logo,
  Time,
  Name,
  Description,
}: {
  Logo: () => JSX.Element;
  Time: () => JSX.Element;
  Name: () => JSX.Element;
  Description: () => JSX.Element;
}) => (
  <StyledContainer>
    <StyledLogoContainer>
      <Logo />
      <Time />
    </StyledLogoContainer>
    <StyledTextContainer>
      <Name />
      <Description />
    </StyledTextContainer>
  </StyledContainer>
);
