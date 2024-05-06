import Svg, {Circle, G, Path} from 'react-native-svg';
import React from 'react';

export const Pascetarian = () => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 101 101"
    fillRule={'evenodd'}
    clipRule={'evenodd'}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
    strokeMiterlimit={'1.5'}>
    <G>
      <Path
        d="M50.007,0c27.6,0 50.007,22.407 50.007,50.007c0,27.6 -22.407,50.007 -50.007,50.007c-27.6,0 -50.007,-22.407 -50.007,-50.007c0,-27.6 22.407,-50.007 50.007,-50.007Zm0,8.492c22.913,0 41.515,18.603 41.515,41.515c-0,22.913 -18.602,41.515 -41.515,41.515c-22.912,-0 -41.515,-18.602 -41.515,-41.515c0,-22.912 18.603,-41.515 41.515,-41.515Z"
        fill="#4988ad"
      />
      <G>
        <Path
          d="M19.37,50.235c0,0 18.857,26.857 45.718,-0.105l14.721,-12.256"
          fill={'none'}
          stroke={'#4988ad'}
          strokeWidth={'6.44px'}
        />
        <Path
          d="M19.37,49.779c0,-0 18.857,-26.857 45.718,0.105l14.721,12.256"
          fill={'none'}
          stroke={'#4988ad'}
          strokeWidth={'6.44px'}
        />
      </G>
      <Circle cx="35.931" cy="47.215" r="2.792" fill="#4988ad" />
      <Path
        d="M79.809,37.874l-0,24.266"
        fill={'none'}
        stroke={'#4988ad'}
        strokeWidth={'6.25px'}
      />
    </G>
  </Svg>
);
