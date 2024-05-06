import styled from 'styled-components/native';
import React from 'react';

export const StyledContainer = styled.View`
  height: 100%;
  position: relative;
  padding-top: 7px;
  background-color: white;
`;

export const DishLayout = ({
  Slider,
  Info,
  Footer,
}: {
  Slider: () => JSX.Element;
  Info: () => JSX.Element;
  Footer: () => JSX.Element;
}) => (
  <StyledContainer>
    <Slider />
    <Info />
    <Footer />
  </StyledContainer>
);
