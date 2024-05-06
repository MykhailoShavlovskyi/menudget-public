import {Path, Svg} from 'react-native-svg';
import React from 'react';

// Cart icon
export const Cart = ({color, ...rest}: {color?: string} & {style?: any}) => (
  <Svg width="28" height="29" viewBox="0 0 28 29" fill="none" {...rest}>
    <Path
      d="M11.9667 24.75C11.9667 25.9739 11.3095 27.1073 10.2556 27.7079C9.20172 28.3199 7.89839 28.3199 6.83316 27.7079C5.77927 27.1073 5.13334 25.9739 5.13334 24.75C5.13334 23.5375 5.77927 22.4043 6.83316 21.7924C7.89839 21.1805 9.20172 21.1805 10.2556 21.7924C11.3095 22.4043 11.9667 23.5375 11.9667 24.75ZM25.6333 24.75C25.6333 25.9739 24.9872 27.1073 23.9219 27.7079C22.868 28.3199 21.5651 28.3199 20.5112 27.7079C19.446 27.1073 18.7999 25.9739 18.7999 24.75C18.7999 23.5375 19.446 22.4043 20.5112 21.7924C21.5651 21.1805 22.868 21.1805 23.9219 21.7924C24.9872 22.4043 25.6333 23.5375 25.6333 24.75ZM25.6333 5.95016H7.69436L6.83316 2.18775C6.66318 1.33783 5.98325 0.827886 5.13334 0.827886H0V4.23882H3.76219L6.83316 18.2568C7.00315 19.1181 7.69436 19.628 8.54428 19.628H22.2221C22.902 19.628 23.582 19.1181 23.752 18.4268L27.1746 8.17122C27.5146 7.32131 27.0045 5.95016 25.6333 5.95016Z"
      fill={color ? color : 'black'}
    />
  </Svg>
);
