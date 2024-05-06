import {Path, Svg} from 'react-native-svg';
import React from 'react';

export const Home = ({color, ...rest}: {color?: string}) => (
  <Svg width="27" height="26" viewBox="0 0 29 28" fill="none" {...rest}>
    <Path
      d="M14.28 -8.5872e-06L8.16 5.56461V2.8787H4.48796V8.89666L0 12.9767L1.64333 14.79L3.26409 13.3167V26.1233C3.26409 26.8033 3.81929 27.3474 4.48796 27.3474H11.832V20.0033H16.728V27.3474H24.0608C24.7408 27.3474 25.2846 26.8033 25.2846 26.1233V13.3167L26.9167 14.79L28.56 12.9879L14.28 -8.5872e-06ZM16.728 15.1074H11.832V10.2113H16.728V15.1074Z"
      fill={color ? color : 'black'}
    />
  </Svg>
);
