import {TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {AnimateArrow} from './TutorialNextArrow';

//region Style

const Container = styled.View`
  width: 100%;
  height: 15.8%;
  background-color: white;
  justify-content: center;
  align-items: flex-end;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  padding-bottom: 6px;
  padding-left: 6px;
`;

const ButtonText = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  margin-right: 15px;
  letter-spacing: 0px;

  color: #ffbd02;
`;

//endregion Style

const titles = ['Next', 'Understand', 'I wanna eat!'];

export const TutorialNextButton = ({
  step,
  onPress,
}: {
  step: number;
  onPress: () => void;
}) => (
  <Container>
    <TouchableWithoutFeedback onPress={onPress}>
      <ContentContainer>
        <ButtonText>{titles[step - 1]}</ButtonText>
        <AnimateArrow />
      </ContentContainer>
    </TouchableWithoutFeedback>
  </Container>
);
