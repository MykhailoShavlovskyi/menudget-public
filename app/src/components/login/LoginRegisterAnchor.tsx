import styled from 'styled-components/native';
import React from 'react';

const StyledContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 0;
  margin-bottom: 36px;
`;

const StyledMessageText = styled.Text`
  font-family: Avenir;
  font-weight: 500;
  font-size: 15px;
  color: #b2b2b2;
  letter-spacing: 0.3px;
`;

const StyledAnchorText = styled.Text`
  font-family: Avenir;
  font-weight: 500;
  font-size: 15px;
  color: #ffbd02;
  letter-spacing: 0.3px;
`;

export const LoginRegisterAnchor = ({
  state,
  onPress,
}: {
  state: 'login' | 'register';
  onPress: () => void;
}) => (
  <StyledContainer>
    <StyledMessageText>
      {state === 'login' ? "Don't h" : 'H'}ave an account?{' '}
    </StyledMessageText>
    <StyledAnchorText onPress={onPress}>
      {state === 'login' ? 'Register' : 'Login'} here
    </StyledAnchorText>
  </StyledContainer>
);
