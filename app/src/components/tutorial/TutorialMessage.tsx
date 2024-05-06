import styled from 'styled-components/native';
import React from 'react';

const Container = styled.View`
  padding: 0 20px 0 43px;
  height: 80px;
`;

const StepText = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  letter-spacing: 0.5px;

  color: #ffffff;
  margin-bottom: 11px;
`;

const MessageText = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.4px;

  line-height: 21px;

  margin-left: 1px;
  padding-top: 5px;
  margin-top: -6px;

  color: #ffffff;
`;

const messages = [
  'Scan QR code that you see on            the table and check the AR menu',
  'Choose the dishes and create your order online using this app',
  'Enjoy your food!',
];

export const TutorialMessage = ({step}: {step: number}) => (
  <Container>
    <StepText>Step {step}</StepText>
    <MessageText>{messages[step - 1]}</MessageText>
  </Container>
);
