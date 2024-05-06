import styled from 'styled-components/native';
import React, {useState} from 'react';
import {Button} from './Button';

const View = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

/*
const Image = styled(ImageBackground)`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 100%;
`;
*/

const StyledImage = styled.Image`
  resize-mode: cover;
  position: absolute;
  opacity: 0.5;
  bottom: 0;
  /*top: 11px;*/
  /* bottom: 0;*/
  /*top: 127px*/

  width: ${390 * 1.0075}px;
  /*height: ${907 * 1.0075}px;*/
  height: ${844 * 1.0075}px;
`;

const StyledButton = styled(Button)`
  top: 5%;
  right: 0;
  position: absolute;
  transform: scale(0.5);
`;

const StyledButton2 = styled(Button)`
  top: 10%;
  right: 0;
  position: absolute;
  transform: scale(0.5);
`;

const images = [
  require('../../assets/screens/welcome.png'), // 0
  require('../../assets/screens/step1.png'), // 1
  require('../../assets/screens/policy.png'), // 2
  require('../../assets/screens/filters.png'), // 3
  require('../../assets/screens/menu.png'), // 4
  require('../../assets/screens/dish.png'), // 5
  require('../../assets/screens/order.png'), // 6
  require('../../assets/screens/qr.png'), // 7
  require('../../assets/screens/login.png'), // 8
  require('../../assets/screens/notification-bar.png'), // 9
  require('../../assets/screens/skeleton.png'), // 10
  require('../../assets/screens/orders.png'), // 11
  require('../../assets/screens/new-order.png'), // 12
  require('../../assets/screens/order-dishes.png'), // 13
  require('../../assets/screens/new-version.png'), // 14
  require('../../assets/screens/no-internet.png'), // 15
  require('../../assets/screens/menu-new.png'), // 16
  require('../../assets/screens/new-dish.png'), // 17
  require('../../assets/screens/confirm-order.png'), // 18
];

export const DesignScreen = ({screen}: {screen: number}) => {
  const [opacity, setOpacity] = useState(true);
  const [hidden, setHidden] = useState(false);

  return (
    <View
      /*style={{marginTop: useSafeAreaInsets().top}}*/ pointerEvents="auto"
      style={{width: '100%', height: '100%'}}>
      <StyledImage
        style={{opacity: hidden ? 0 : opacity ? 0.5 : 1}}
        //style={{opacity: 1}}
        source={images[screen]}
        defaultSource={images[screen]}
      />
      <StyledButton
        title={'opacity ' + (opacity ? 'on' : 'off')}
        onPress={() => setOpacity(v => !v)}
      />
      <StyledButton2
        title={'vis ' + (hidden ? 'off' : 'on')}
        onPress={() => setHidden(v => !v)}
      />
    </View>
  );
};
