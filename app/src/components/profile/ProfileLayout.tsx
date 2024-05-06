import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {PropsWithChildren} from 'react';

const StyledView = styled.View`
  display: flex;
  align-items: center;
  padding: 24px;
  background-color: white;
  height: 100%;
`;

export const ProfileLayout = ({children}: PropsWithChildren<any>) => (
  <StyledView style={{paddingTop: useSafeAreaInsets().top + 110}}>
    {children}
  </StyledView>
);
