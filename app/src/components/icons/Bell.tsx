import Svg, {Path} from 'react-native-svg';
import React from 'react';

export const Bell = ({color, ...rest}: {color?: string}) => (
  <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" {...rest}>
    <Path
      d="M24.8 16.7C27.4 14.1 27.9 10.1 26.1 7.00002L26.2 6.90002C26.6 6.50002 26.8 6.00002 26.8 5.40002C26.8 4.80002 26.6 4.30002 26.2 3.90002C25.4 3.10002 24 3.10002 23.2 3.90002L23.1 4.00002C21.9 3.30002 20.5 2.90002 19.1 2.90002C16.9 2.90002 14.9 3.70002 13.4 5.30002L8.79998 9.70002C7.89998 10.6 6.29998 10.6 5.39998 9.70002C4.79998 9.20002 3.89998 9.20002 3.29998 9.70002C2.69998 10.3 2.69998 11.2 3.29998 11.8L18.1 26.6C18.4 26.9 18.8 27.1 19.2 27.1C19.6 27.1 20 26.9 20.3 26.7C20.6 26.4 20.7 26 20.7 25.6C20.7 25.3 20.6 24.9 20.4 24.7C20.4 24.6 20.3 24.5 20.2 24.5C19.8 24.1 19.6 23.5 19.6 22.9C19.6 22.3 19.8 21.7 20.3 21.2L24.8 16.7ZM16 8.30002C15.9 8.40002 15.8 8.40002 15.6 8.40002C15.4 8.40002 15.3 8.40002 15.2 8.30002C15 8.10002 15 7.80002 15.2 7.60002C17 5.80002 19.9 5.50002 22 6.90002C22.2 7.10002 22.3 7.40002 22.1 7.60002C21.9 7.80002 21.6 7.90002 21.4 7.70002C19.8 6.60002 17.5 6.80002 16 8.30002Z"
      fill={color ?? 'black'}
    />
    <Path
      d="M6.49996 18C6.29996 17.8 5.99996 17.8 5.79996 18C4.09996 19.7 4.09996 22.5 5.79996 24.2C6.59996 25 7.69996 25.5 8.89996 25.5C10.1 25.5 11.2 25 12 24.2C12.2 24 12.2 23.7 12 23.5L6.49996 18Z"
      fill={color ?? 'black'}
    />
  </Svg>
);
