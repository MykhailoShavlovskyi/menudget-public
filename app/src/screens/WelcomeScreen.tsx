import React from 'react';
import {LetsGoButton} from '../containers/welcome/LetsGoButton';
import {WelcomeLayout} from '../components/welcome/WelcomeLayout';
import {usePortrait} from '../lib/orientation';

export const WelcomeScreen = () => {
  usePortrait();

  return (
    <>
      <WelcomeLayout LetsGoButton={LetsGoButton} />
      {/*<DesignScreen screen={0} />*/}
    </>
  );
};
