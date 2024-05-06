import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.TouchableOpacity`
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 268px;
  resize-mode: contain;
`;

export const DishPhoto = ({
  source,
  onPress,
  onLongPress,
}: {
  source: string;
  onPress: () => void;
  onLongPress: () => void;
}) => (
  <StyledContainer onPress={onPress} onLongPress={onLongPress}>
    <StyledImage source={{url: source}} />
  </StyledContainer>
);
