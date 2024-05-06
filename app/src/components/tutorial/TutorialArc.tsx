import {Dimensions} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import React from 'react';

const width = Dimensions.get('window').width;
const ratio = width / 502;
const left = (width - 502) * 0.5;
const bottom = (107 * ratio - 107) * 0.5 - 1;

export const TutorialArc = () => (
  <Svg
    style={{
      transform: [{scale: ratio}],
      left: left,
      bottom: bottom,
    }}
    width="502"
    height="107"
    viewBox="0 0 502 107"
    fill="none">
    <Path
      d="M502 106.5L501 0C363.93 140.092 137.628 139.544 0 0V106.5H502Z"
      fill="white"
    />
  </Svg>
);
