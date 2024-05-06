import styled from 'styled-components/native';
import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

const StyledContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 205px;
  align-items: center;
  justify-content: center;

  border: #e5e5e5 3px dashed;
  border-radius: 16px;
`;

const StyledText = styled.Text`
  font-family: Avenir;
  font-weight: 700;
  color: #b2b2b2;
  font-size: 20px;
`;

export const NoContent = ({
  message,
  containerStyle,
  textStyle,
}: {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => (
  <StyledContainer style={containerStyle}>
    <StyledText style={textStyle}>{message}</StyledText>
  </StyledContainer>
);
