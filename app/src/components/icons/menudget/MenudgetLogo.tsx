import styled from 'styled-components/native';
import Dish from './Dish';
import MenuDget from './MenuDget';
import React from 'react';

const StyledLogoContainer = styled.View<{top?: string}>`
  z-index: 10;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  top: ${(props: any) => (typeof props.top === 'string' ? props.top : '70px')};
`;

const StyledMenuDgetWrp = styled.View`
  margin-top: 10px;
`;

export const MenudgetLogo = () => (
  <StyledLogoContainer>
    <Dish />
    <StyledMenuDgetWrp>
      <MenuDget />
    </StyledMenuDgetWrp>
  </StyledLogoContainer>
);
