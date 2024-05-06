import * as React from 'react';
import Svg, {Defs, LinearGradient, Stop, G, Path} from 'react-native-svg';

/* SVGR has dropped some elements not supported by react-native-svg: filter */
export function ButtonDisk(props: any) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={129} height={131} {...props}>
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1="0%"
          x2="70.473%"
          y1="0%"
          y2="70.947%">
          <Stop offset="0%" stopColor="#FFCB00" />
          <Stop offset="100%" stopColor="#FF9B06" />
        </LinearGradient>
      </Defs>
      <G filter="url(#prefix__a)">
        <Path
          fillRule="evenodd"
          fill="url(#prefix__b)"
          d="M63.999.976c19.511 0 34.519 15.467 34.519 34.518 0 19.052-15.008 34.636-34.519 34.636-19.051 0-34.518-15.584-34.518-34.636C29.481 16.443 44.948.976 63.999.976z"
        />
      </G>
    </Svg>
  );
}
