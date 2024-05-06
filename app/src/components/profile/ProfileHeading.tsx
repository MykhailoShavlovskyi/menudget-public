import styled from 'styled-components/native';
import React from 'react';

const StyledHeader = styled.Text`
  color: black;
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 27px;
  letter-spacing: -0.5px;
  margin-top: 16px;
`;

export const ProfileHeading = () => <StyledHeader>Profile</StyledHeader>;
