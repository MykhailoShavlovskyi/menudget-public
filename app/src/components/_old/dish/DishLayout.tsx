import styled from 'styled-components/native';
import React from 'react';

//export const StyledContainer = styled.ScrollView`
export const StyledContainer = styled.View`
  background-color: white;
  height: 100%;
  position: relative;
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
