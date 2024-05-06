import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {TutorialImageBackground as ImageBackground} from '../../components/tutorial/TutorialImageBackground';
import {TutorialMessage} from '../../components/tutorial/TutorialMessage';
import {TutorialOverlay} from '../../components/tutorial/TutorialOverlay';
import {TutorialHeader} from '../../components/tutorial/TutorialHeader';
import {TutorialArc} from '../../components/tutorial/TutorialArc';
import {TutorialNextButton as NextButton} from '../../components/tutorial/TutorialNextButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WelcomeNavigation} from '../../navigators/RootStackNavigator';
import {useTutorialComplete} from '../../lib/storage';

function useTutorialStep() {
  const route = useRoute();
  if (route.name === 'Tutorial1') return 1;
  if (route.name === 'Tutorial2') return 2;
  if (route.name === 'Tutorial3') return 3;
  return -1;
}

export const TutorialImageBackground = (props: PropsWithChildren<{}>) => (
  <ImageBackground step={useTutorialStep()} {...props} />
);

const Message = () => <TutorialMessage step={useTutorialStep()} />;
export const TutorialContent = () => (
  <>
    <TutorialOverlay />
    <TutorialHeader />
    <View>
      <Message />
      <TutorialArc />
    </View>
  </>
);

export const TutorialNextButton = () => {
  const route = useRoute();
  const navigation = useNavigation<WelcomeNavigation>();
  const {setTutorialComplete} = useTutorialComplete();

  const goNext = () => {
    switch (route.name) {
      case 'Tutorial1':
        navigation.navigate('Tutorial2');
        break;
      case 'Tutorial2':
        navigation.navigate('Tutorial3');
        break;
      case 'Tutorial3':
        setTutorialComplete(true);
        navigation.navigate('QR');
        break;
    }
  };

  return <NextButton step={useTutorialStep()} onPress={goNext} />;
};
