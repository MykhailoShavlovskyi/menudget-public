import styled from 'styled-components/native';
import React from 'react';

const StyledContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 39px;
  background-color: white;
`;

export const LoginRegisterLayout = ({
  Logo,
  Header,
  Inputs,
  Anchor,
}: {
  Logo: () => JSX.Element;
  Header: () => JSX.Element;
  Inputs: () => JSX.Element;
  Anchor: () => JSX.Element;
}) => (
  <>
    <StyledContainer>
      <Logo />
      <Header />
      <Inputs />
    </StyledContainer>
    <Anchor />
  </>
);
