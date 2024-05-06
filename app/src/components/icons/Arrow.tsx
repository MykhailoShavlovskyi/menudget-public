import Svg, {Path} from 'react-native-svg';
import React from 'react';

export const Arrow = ({color, ...rest}: {color?: string}) => (
  <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" {...rest}>
    <Path
      d="M11.3562 22.7334L13.3621 20.7275L5.43994 12.7943H22.712V9.94946H5.43994L13.3621 2.01622L11.3562 0.0103304L0 11.3776L11.3562 22.7334Z"
      fill={color ?? 'black'}
    />
  </Svg>
);
