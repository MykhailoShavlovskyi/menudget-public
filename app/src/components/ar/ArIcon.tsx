import React from 'react';
import styled from 'styled-components/native';
import {Model} from '../icons/Model';

const StyledIconContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const ArIcon = () => (
  <StyledIconContainer pointerEvents={'none'}>
    <Model />
  </StyledIconContainer>
);
