import styled from 'styled-components/native';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import React from 'react';

const StyledContainer = styled.View`
  justify-content: center;
  align-items: center;
  z-index: 20;
  width: 100%;
`;

const StyledBackground = styled.View`
  background-color: black;
  border-radius: 32px;
  width: 70px;
  height: 35px;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 15 15" fill="none">
    <Path
      d="M0 5.45253H5.45238V-6.71306e-05H8.71712V5.45253H14.1695V8.71705H8.71712V14.1694H5.45238V8.71705H0V5.45253Z"
      fill="white"
    />
  </Svg>
);

export const DishAddButton = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity onPress={onPress}>
    <StyledContainer>
      <StyledBackground>
        <PlusIcon />
      </StyledBackground>
    </StyledContainer>
  </TouchableOpacity>
);
