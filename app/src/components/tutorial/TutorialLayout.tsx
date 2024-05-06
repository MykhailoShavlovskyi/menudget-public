import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

export const TutorialLayout = ({
  Background,
  Content,
  NextButton,
}: {
  Background: (props: PropsWithChildren<{}>) => JSX.Element;
  Content: () => JSX.Element;
  NextButton: () => JSX.Element;
}) => (
  <View style={{width: '100%', height: '100%'}}>
    <Background>
      <Content />
    </Background>
    <NextButton />
  </View>
);
