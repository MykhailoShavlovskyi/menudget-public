import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import React, {PropsWithChildren} from 'react';

const Image = styled(ImageBackground)`
  flex: 1;
  justify-content: space-between;
`;

const images = [
  require('../../../assets/images/tutorial1.png'),
  require('../../../assets/images/tutorial2.png'),
  require('../../../assets/images/tutorial3.png'),
];

export const TutorialImageBackground = ({
  step,
  children,
}: {step: number} & PropsWithChildren<{}>) => (
  <Image source={images[step - 1]} defaultSource={images[step - 1]}>
    {children}
  </Image>
);
