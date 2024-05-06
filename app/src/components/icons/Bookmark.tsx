import {Path, Svg} from 'react-native-svg';
import React from 'react';

export const Bookmark = ({color, ...rest}: {color?: string}) => (
  <Svg width="20" height="27" viewBox="0 0 22 29" fill="none" {...rest}>
    <Path
      d="M18.2377 0.822162H3.03784C1.36028 0.822162 0.0225812 2.18244 0.0225812 3.86L0 28.1733L10.6433 23.6166L21.2755 28.1733V3.86C21.2755 2.18244 19.9152 0.822162 18.2377 0.822162V0.822162ZM18.2377 23.6166L10.6433 20.3069L3.03784 23.6166V3.86H18.2377V23.6166Z"
      fill={color ? color : 'black'}
    />
  </Svg>
);
