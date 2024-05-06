import styled from 'styled-components/native';
import React from 'react';
import {BackButton} from '../common/BackButton';

const StyledContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 28px;
`;

const StyledImage = styled.Image`
  width: 80%;
  height: 37px;
`;

export const LoginRegisterLogoHeader = () => (
  <StyledContainer>
    <StyledImage source={require('../../../assets/images/logo.png')} />
  </StyledContainer>
);
