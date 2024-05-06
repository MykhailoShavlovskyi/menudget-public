import React, {MutableRefObject} from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  align-items: center;
  overflow: visible;
  margin-bottom: 17px;
`;

const StyledHeader = styled.Text`
  color: black;
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 27px;
  letter-spacing: -0.5px;
`;

const StyledDescription = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 12.5px;

  color: #b2b2b2;

  padding-top: 2px;
  margin: 12px 40px 3px;
  text-align: center;
  line-height: 12px;
  overflow: visible;
`;

// Order messages
export const OrderMessages = ({
  messagesRed,
  headerRef,
  descriptionRef,
}: {
  messagesRed: MutableRefObject<any>;
  headerRef: MutableRefObject<any>;
  descriptionRef: MutableRefObject<any>;
}) => (
  <StyledContainer ref={messagesRed}>
    <StyledHeader ref={headerRef}>Your order</StyledHeader>
    <StyledDescription ref={descriptionRef}>
      Bla bla bla so yummy sushi, wow, super sezy pack Bla bla bla so yummy
      sushi, wow, super sezy pack
    </StyledDescription>
  </StyledContainer>
);
