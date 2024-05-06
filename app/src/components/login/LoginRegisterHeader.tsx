import styled from 'styled-components/native';
import React from 'react';

const StyledText = styled.Text`
  margin-top: 65px;
  margin-bottom: 34px;
  color: #ffbd02;
  width: 100%;
  font-size: 26px;
  text-align: center;
  font-family: Avenir;
  font-weight: 900;
`;

export const LoginRegisterHeader = ({value}: {value: string}) => (
  <StyledText>{value}</StyledText>
);
