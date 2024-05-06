import styled from 'styled-components/native';
import {Arrows} from './Arrows';
import React from 'react';
import {TouchableOpacity} from 'react-native';

//region Style

const StyledContainer = styled.View`
  position: absolute;
  width: 100%;

  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  bottom: 11.5%;
`;

const StyledTextContainer = styled.View`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const StyledTextPressContainer = styled(TouchableOpacity)`
  width: 120px;
`;
const StyledText = styled.Text`
  color: white;
  font-size: 26px;
  font-weight: 500;
  font-family: Avenir;

  text-align: center;
`;

const StyledArrowsPressContainer = styled(TouchableOpacity)`
  padding: 6px;
  margin: -6px;
`;

//endregion Style

const Text = ({onPress}: {onPress: () => void}) => (
  <StyledTextContainer>
    <StyledTextPressContainer onPress={onPress}>
      <StyledText>Lets go!</StyledText>
    </StyledTextPressContainer>
  </StyledTextContainer>
);

const AnimatedArrows = ({onPress}: {onPress: () => void}) => (
  <StyledArrowsPressContainer onPress={onPress}>
    <Arrows />
  </StyledArrowsPressContainer>
);

export const LetsGoButton = ({onPress}: {onPress: () => void}) => (
  <StyledContainer>
    <Text onPress={onPress} />
    <AnimatedArrows onPress={onPress} />
  </StyledContainer>
);
