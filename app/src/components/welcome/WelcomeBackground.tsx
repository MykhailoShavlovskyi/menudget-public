import styled from 'styled-components/native';
import React, {PropsWithChildren} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StyledContainer = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`;

export const WelcomeBackground = (props: PropsWithChildren<{}>) => (
  <StyledContainer
    colors={['#FFC500', '#FF8B01']}
    start={{x: 0.288, y: 0.1597}}
    end={{x: 1.32, y: 0.42751}}
    {...props}
  />
);
