import {Path, Svg} from 'react-native-svg';
import React from 'react';

export const ArrowRight = ({color, ...props}: {color?: string}) => (
  <Svg width="17" height="17" viewBox="0 0 19 19" fill="none" {...props}>
    <Path
      d="M9.06525 0.202873L7.46743 1.8008L13.7904 8.13497H0V10.4013H13.7904L7.46743 16.7357L9.06525 18.3334L18.1305 9.26812L9.06525 0.202873Z"
      fill={color ?? 'white'}
    />
  </Svg>
);
