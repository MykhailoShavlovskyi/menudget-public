import React, {forwardRef} from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  align-items: center;
  overflow: visible;

  padding-right: 16px;
  padding-left: 16px;
  padding-top: 23px;
`;

const StyledHeader = styled.Text`
  color: black;
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  letter-spacing: 0.17px;
`;

const StyledDescription = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 12.5px;

  color: #b2b2b2;

  padding-top: 2px;
  margin: 8px 40px 7px;
  text-align: center;
  line-height: 12px;
  overflow: visible;
`;

export const ReceiptMessages = forwardRef((_, ref) => (
  <StyledContainer ref={ref}>
    <StyledHeader>Your order</StyledHeader>
    <StyledDescription>
      Get ready to indulge in a culinary adventure! Your order is just a tap
      away
    </StyledDescription>
  </StyledContainer>
));
