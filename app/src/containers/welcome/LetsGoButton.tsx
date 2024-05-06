import React from 'react';
import {LetsGoButton as LetsGoButtonBase} from '../../components/welcome/LetsGoButton';
import {useNavigation} from '@react-navigation/native';
import {WelcomeNavigation} from '../../navigators/RootStackNavigator';
import {useTutorialComplete} from '../../lib/storage';

export const LetsGoButton = () => {
  const navigation = useNavigation<WelcomeNavigation>();
  const {tutorialComplete} = useTutorialComplete();
  const goNext = () => {
    if (tutorialComplete) navigation.navigate('QR');
    else navigation.navigate('Tutorial1');
  };

  return <LetsGoButtonBase onPress={goNext} />;
};
