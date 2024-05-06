import styled from 'styled-components/native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Overlay = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  opacity: 0.35;
  position: absolute;
  justify-content: space-between;
  background-color: tomato;
`;

export const TutorialOverlay = () => (
  <Overlay
    colors={['#ffffff', '#FF8B01']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
  />
);
