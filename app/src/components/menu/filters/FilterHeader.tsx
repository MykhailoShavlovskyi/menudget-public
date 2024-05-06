import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  padding: 15px 0;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.4px;
  font-family: Avenir;
`;

export const FilterHeader = ({value, ...rest}: {value: string}) => (
  <StyledContainer {...rest}>
    <StyledText>{value}</StyledText>
  </StyledContainer>
);
