import React, {PropsWithChildren, useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import Emoji from 'react-native-emoji';

//region Style

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledLine = styled.View<{active: boolean}>`
  width: 35px;
  height: 4px;
  background-color: ${(p: any) => (p.active ? '#FFBD02' : '#E3E3E3')};
`;

const StyledKnobContainer = styled.View`
  align-items: center;
`;

const StyledKnob = styled.View<{active: boolean}>`
  width: 24px;
  height: 24px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${(p: any) => (p.active ? '#FFBD02' : '#E3E3E3')};
`;

const StyledEmojiContainer = styled.View`
  bottom: 30px;
  position: absolute;
`;

const StyledText = styled.Text`
  margin-top: 2px;
  color: white;
  font-family: Avenir;
  font-size: 16px;
  font-weight: 700;
`;

//endregion Style

//region Components

const Container = ({
  onPress,
  children,
}: PropsWithChildren<{onPress: () => void}>) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <StyledKnobContainer>{children}</StyledKnobContainer>
  </TouchableWithoutFeedback>
);

const Knob = ({value, active}: {value: string; active: boolean}) => (
  <StyledKnob active={active}>
    <StyledText>{value}</StyledText>
  </StyledKnob>
);

const Icon = ({emoji}: {emoji: string}) => (
  <StyledEmojiContainer>
    <Emoji name={emoji} style={{fontSize: 18} as any} />
  </StyledEmojiContainer>
);

//endregion Components

export const SliderKnob = ({
  index,
  active,
  emoji,
  onSelect,
}: {
  index: number;
  active: boolean;
  emoji: string;
  onSelect: (v: number) => void;
}) => {
  // Get value
  const value = index.toString();

  // Handle press
  const handleToggle = useCallback(() => onSelect(index), [onSelect, index]);

  // Render
  return (
    <StyledContainer>
      {!!index && <StyledLine active={active} />}
      <Container onPress={handleToggle}>
        <Knob value={value} active={active} />
        <Icon emoji={emoji} />
      </Container>
    </StyledContainer>
  );
};
