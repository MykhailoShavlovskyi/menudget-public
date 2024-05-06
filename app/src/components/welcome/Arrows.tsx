import React from 'react';
import styled from 'styled-components/native';
import {AnimatedArrow} from './AnimatedArrow';

const StyledContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 31px;
  margin-bottom: 2px;
`;

export const Arrows = () => (
  <StyledContainer>
    <AnimatedArrow start={0} />
    <AnimatedArrow start={0.3} />
    <AnimatedArrow start={0.6} />
  </StyledContainer>
);
