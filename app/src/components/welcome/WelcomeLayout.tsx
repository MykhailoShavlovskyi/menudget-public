import {WelcomeBackground} from './WelcomeBackground';
import {WelcomeLogo} from './WelcomeLogo';
import React from 'react';

export const WelcomeLayout = ({
  LetsGoButton,
}: {
  LetsGoButton: () => JSX.Element;
}) => (
  <WelcomeBackground>
    <WelcomeLogo />
    <LetsGoButton />
  </WelcomeBackground>
);
