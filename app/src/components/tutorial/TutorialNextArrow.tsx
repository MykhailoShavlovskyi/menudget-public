import styled from 'styled-components/native';
import React, {memo} from 'react';
import {animated} from 'react-spring';
import {View} from 'react-native';
import {ArrowRight} from '../icons/ArrowRight';
import {useLoopSpring} from '../../lib/useLoopSpring';

const Container = styled.View`
  margin-right: 36px;
  margin-bottom: 2px;
`;

const AnimatedContainer = animated(View) as any;

const StyledArrow = styled(ArrowRight)``;

const duration = 750;
const fromRight = 0;
const toRight = -8;

function getNextState(toggle: 0 | 1) {
  return {right: toggle === 1 ? toRight : fromRight};
}

function useAnimatedStyle() {
  return useLoopSpring(duration, 0, {right: fromRight}, getNextState);
}

export const AnimateArrow = memo(() => (
  <Container>
    <AnimatedContainer style={useAnimatedStyle()}>
      <StyledArrow color={'#FFBD02'} />
    </AnimatedContainer>
  </Container>
));
