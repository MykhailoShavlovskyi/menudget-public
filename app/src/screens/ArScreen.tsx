import React, {useCallback, useEffect, useState} from 'react';
import {ArDishLayout, StyledArPlaceholder} from '../components/ar/ArDishLayout';
import {ArTopContent} from '../containers/ar/ArTopContent';
import {ArBottomContent} from '../containers/ar/ArBottomContent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ArRender} from '../containers/ar/ArRender';
import Orientation from '@hortau/react-native-orientation-locker';
import {useMount, useRafLoop} from 'react-use';
import {easeOutCubic} from '../lib/easing';

let startTime = 0;
const enterDelay = 650;
const fadeOutDuration = 1000;
const fadeInDuration = 500;
const distance = 1;

const FadeOutContainer = ({enabled}: {enabled: boolean}) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (enabled) startTime = performance.now();
  }, [enabled]);

  useRafLoop(() => {
    if (!enabled || opacity === 0) return;

    const time = performance.now();
    let delta = Math.max(0, time - startTime - enterDelay);
    if (delta > fadeOutDuration) delta = fadeOutDuration;
    delta = easeOutCubic(delta / fadeOutDuration) * fadeOutDuration;

    let o = 1 - (delta / fadeOutDuration) * distance;
    setOpacity(o);
  });

  return (
    <StyledArPlaceholder
      opacity={opacity}
      pointerEvents={opacity === 0 ? 'none' : 'auto'}
    />
  );
};

const FadeinContainer = ({onFinish}: {onFinish: () => void}) => {
  const [opacity, setOpacity] = useState(0);

  useMount(() => {
    startTime = performance.now();
  });

  useRafLoop(() => {
    if (opacity === 1) return;

    const time = performance.now();
    let delta = time - startTime;
    if (delta > fadeInDuration) delta = fadeInDuration;
    delta = easeOutCubic(delta / fadeInDuration) * fadeInDuration;

    let o = (delta / fadeInDuration) * distance;
    if (o === 1) onFinish();

    setOpacity(o);
  });

  return <StyledArPlaceholder opacity={opacity} pointerEvents={'none'} />;
};

export const ArScreen = () => {
  const [renderKey, setRenderKey] = useState('key');
  const [entering, setEntering] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [landscape, setLandscape] = useState(false);

  // On focus
  useFocusEffect(
    useCallback(() => {
      setRenderKey(String(Math.random() * 9999999));
      setTimeout(() => {
        Orientation.lockToLandscape();
        setTimeout(() => setLandscape(true), 500);
      }, 250);
    }, []),
  );

  // On lost focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        setEntering(false);
        setExiting(false);
        setLandscape(false);
      };
    }, []),
  );

  // Handle exit request
  const handleExitRequest = useCallback(() => {
    setExiting(true);
  }, []);

  // Handle finish exit
  const navigation = useNavigation();
  const handleFinishExit = useCallback(() => {
    Orientation.lockToPortrait();
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  }, []);

  return (
    <>
      {landscape && (
        <ArDishLayout
          TopContent={() => <ArTopContent onExit={handleExitRequest} />}
          BottomContent={ArBottomContent}
          Render={
            <ArRender key={renderKey} onInitialize={() => setEntering(true)} />
          }
        />
      )}
      <FadeOutContainer enabled={entering} />
      {exiting && <FadeinContainer onFinish={handleFinishExit} />}
    </>
  );
};
