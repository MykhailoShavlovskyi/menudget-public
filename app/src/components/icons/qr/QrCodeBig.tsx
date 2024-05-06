import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const QrCodeBig = ({color = '#fff', ...props}: any) => (
  <Svg fill="none" height="70%" width="70%" {...props}>
    <Path
      clipRule="evenodd"
      d="M8.09 57.131h50.344V8.111H8.09v49.02z"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.296 37.227H28.227v-9.774h10.07v9.774z"
      fill={color}
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      clipRule="evenodd"
      d="M8.09 154.524h50.344V105.65H8.09v48.874z"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.296 134.974H28.227v-9.775h10.07v9.775z"
      fill={color}
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      clipRule="evenodd"
      d="M109.051 57.131h50.069V8.111h-50.069v49.02z"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M138.983 37.227h-10.068v-9.774h10.068v9.774z"
      fill={color}
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      d="M159.12 154.524h-45.309v-19.55H83.605v-9.775M103.743 110.537h35.24V81.214h20.137M13.124 71.439v9.775h30.207v9.774M93.674 12.79v19.55H78.57v48.874h35.24v9.774M138.983 110.537h20.137"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      d="M138.983 154.524v-14.662h10.069v-9.775M83.605 134.974v19.55M43.33 81.214H53.4M149.052 81.214v-9.775"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      clipRule="evenodd"
      d="M88.64 95.876H78.57V81.214h10.07v14.662z"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
    <Path
      d="M88.64 57.131H78.57M149.052 139.862v14.662"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="square"
    />
  </Svg>
);
export default QrCodeBig;
