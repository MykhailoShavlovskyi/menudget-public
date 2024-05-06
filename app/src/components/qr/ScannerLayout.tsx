import React, {useState} from 'react';
import styled from 'styled-components/native';
import {QrScanner} from './QrScanner';
import {AllowAccessMessage} from './AllowAccessMessage';
import {ScanBackground} from '../icons/ScanBackground';
import {QrScan} from '../icons/qr/QrScan';
import {MenudgetLogo} from '../icons/menudget/MenudgetLogo';
import {useQrScanner} from '../../lib/camera';
import {env} from '../../lib/env';
import {useMount, useRafLoop} from 'react-use';
import {easeOutCubic} from '../../lib/easing';

type Props = {
  onScan: (restaurantId: number, tableId: number) => void;
  onDevScan: () => void;
};

//const StyledContainer = (env.DEV_MODE ? styled.TouchableOpacity : styled.View)`
const StyledContainer = (true ? styled.TouchableOpacity : styled.View)`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

const StyledBackground = styled(ScanBackground)`
  top: 0;
`;

const StyledFadeContainer = styled.View<{opacity: number}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: ${(v: {opacity: number}) => v.opacity};
`;

let startTime = 0;
const duration = 1000;
const delay = 750;
const distance = 1;

const FadeContainer = () => {
  const [opacity, setOpacity] = useState(1);

  useMount(() => {
    startTime = performance.now();
  });
  useRafLoop(() => {
    if (opacity === 0) return;

    const time = performance.now();
    let delta = Math.max(0, time - startTime - delay);
    if (delta > duration) {
      delta = duration;
    }
    delta = easeOutCubic(delta / duration) * duration;

    let o = 1 - (delta / duration) * distance;
    setOpacity(o);
  });

  return <StyledFadeContainer opacity={opacity} />;
};

const ScannerContent = ({onScan}: Props) => (
  <>
    <QrScanner handleScan={onScan} />
    <StyledBackground />
    <FadeContainer />
    <MenudgetLogo />
    <QrScan />
  </>
);

export const ScannerLayout = (props: Props) => {
  const {isInitialized, isAllowed, getPermissions} = useQrScanner();

  if (!isInitialized) return null;
  return (
    <>
      <StyledContainer
        onPress={props.onDevScan}
        onPointerMove={() => console.debug('moving')}>
        {isAllowed ? (
          <ScannerContent {...props} />
        ) : (
          <AllowAccessMessage onAllowAccessPress={getPermissions} />
        )}
      </StyledContainer>
    </>
  );
};
