import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  width: 100%;
  background-color: #eeeeee;
`;

const StyledSplitter = styled.View`
  height: 1.3px;
  width: 100%;
`;

export const Splitter = (props: {color?: string}) => (
  <StyledContainer {...props}>
    <StyledSplitter style={{backgroundColor: props.color}} />
  </StyledContainer>
);
