import styled from 'styled-components/native';
import {animated} from 'react-spring';
import {View} from 'react-native';
import React from 'react';
import {ArrowRight} from '../icons/ArrowRight';
import {useLoopSpring} from '../../lib/useLoopSpring';

const StyledArrow = styled(ArrowRight)`
  margin-left: 12px;
`;

const AnimatedView = animated(View) as any;

const duration = 600;
const minOpacity = 0.1;
const maxOpacity = 1;

function getNextState(toggle: 0 | 1) {
  return {opacity: toggle === 0 ? minOpacity : maxOpacity};
}

function useAnimatedStyle(start: number) {
  return useLoopSpring(duration, start, {opacity: minOpacity}, getNextState);
}

export const AnimatedArrow = ({start}: {start: number}) => (
  <AnimatedView style={useAnimatedStyle(start)}>
    <StyledArrow />
  </AnimatedView>
);
