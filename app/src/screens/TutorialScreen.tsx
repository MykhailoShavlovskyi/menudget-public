import React from 'react';
import {TutorialLayout} from '../components/tutorial/TutorialLayout';
import {
  TutorialContent,
  TutorialImageBackground,
  TutorialNextButton,
} from '../containers/tutorial/tutorial';
import {usePortrait} from '../lib/orientation';

export const TutorialScreen = () => {
  usePortrait();

  return (
    <>
      <TutorialLayout
        Background={TutorialImageBackground}
        Content={TutorialContent}
        NextButton={TutorialNextButton}
      />
      {/*<DesignScreen screen={1} />*/}
    </>
  );
};
