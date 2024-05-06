import styled from 'styled-components/native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Text = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 43px;
  line-height: 44px;
  letter-spacing: 0.1px;

  padding-top: 10px;

  margin-top: 4px;
  margin-left: 42px;
  width: 60%;

  color: #ffffff;
`;

export const TutorialHeader = () => (
  <Text
    style={{
      paddingTop: useSafeAreaInsets().top,
    }}>
    HOW IT WORKS?
  </Text>
);
