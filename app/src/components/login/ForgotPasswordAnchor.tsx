import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-family: Avenir;
  font-weight: 500;
  font-size: 12px;
  color: #ffbd02;
  letter-spacing: 0.2px;
  width: 100%;
  text-align: center;
`;

export const ForgotPasswordAnchor = ({onPress}: {onPress: () => void}) => (
  <StyledText onPress={onPress}>Forget a password?</StyledText>
);
