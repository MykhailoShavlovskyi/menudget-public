import styled from 'styled-components/native';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Home} from './icons/Home';
import {Bookmark} from './icons/Bookmark';
import {ButtonDisk} from './icons/ButtonDisk';
import {Cart} from './icons/Cart';
import {Color} from '../lib/Color';
import {QrCodeSmall} from './icons/qr/QrCodeSmall';
import {Profile} from './icons/Profile';
import Svg, {Path} from 'react-native-svg';
import {useRafLoop} from 'react-use';
import {useFocusEffect} from '@react-navigation/native';
import {Bell} from './icons/Bell';
import {easeInCubic, easeOutCubic} from '../lib/easing';
import {resetMenuFetched} from '../store/slice';

const StyledContainer = styled(Svg)`
  bottom: -32px;
  position: absolute;
  box-shadow: 0 0 8px #dddddd;
`;

const StyledView = styled.View<{bottom?: number}>`
  width: 100%;
  height: 83px;
  position: absolute;
  bottom: ${(p: any) => p.bottom ?? 0};
`;

const StyledFlex = styled.View`
  flex: 1;
  flex-direction: row;
`;

const NavBarPanel = () => (
  <>
    {/*  <Image
      style={{flex: 1, width: '100%', opacity: 0.5}}
      source={require('../assets/nav-bar.png')}></Image>*/}
    <StyledContainer
      /* style={{opacity: 0.2}}*/
      width={Dimensions.get('window').width}
      height="119"
      viewBox="0 0 419 119"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M140.193 -6.10352e-05C150.325 -6.10352e-05 159.426 6.21056 163.121 15.6512C170.385 34.2719 189.55 49.2433 209.315 49.2433C229.069 49.2433 248.245 34.2719 255.51 15.6512C259.205 6.22189 268.294 0.0112305 278.437 0.0112305C310.239 -0.000102861 369.025 -6.10352e-05 369.025 -6.10352e-05C396.225 -6.10352e-05 418.268 22.0546 418.268 49.2433C418.268 81.6226 418.268 118.048 418.268 118.048H0C0 118.048 0 81.6226 0 49.2433C0 22.0546 22.0433 -6.10352e-05 49.2433 -6.10352e-05C49.2433 -6.10352e-05 108.301 -6.10352e-05 140.193 -6.10352e-05Z"
        fill="white"
      />
    </StyledContainer>
  </>
);

const HomeButton = ({
  color,
  onPress,
}: {
  color?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      /*     backgroundColor: 'red',*/
      paddingTop: 26,
      paddingLeft: 46,
      paddingRight: 15,
    }}>
    <View>
      <Home color={color} />
    </View>
  </TouchableOpacity>
);

const BookmarksButton = ({
  color,
  onPress,
}: {
  color?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      /*   backgroundColor: 'blue',*/
      paddingTop: 26,
      paddingLeft: 15,
      paddingRight: 30,
    }}>
    <View>
      <Bookmark color={color} />
    </View>
  </TouchableOpacity>
);

const OrdersButton = ({
  color,
  onPress,
}: {
  color?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      /*   backgroundColor: 'blue',*/
      paddingTop: 24,
      paddingLeft: 15,
      paddingRight: 20,
    }}>
    <View>
      <Bell color={color} />
    </View>
  </TouchableOpacity>
);

const CartButton = ({
  focused,
  onPress,
}: {
  focused: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      height: 200,
      bottom: 32,
    }}>
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
      <ButtonDisk />
      <Cart color={'white'} style={{position: 'absolute', top: 22}} />
    </View>
  </TouchableOpacity>
);

const QrButton = ({color, onPress}: {color?: string; onPress: () => void}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingTop: 26,
      paddingRight: 11,
      paddingLeft: 30,
      /*  backgroundColor: 'blue',*/
    }}>
    <View>
      <QrCodeSmall color={color} />
    </View>
  </TouchableOpacity>
);

const ProfileButton = ({
  color,
  onPress,
}: {
  color?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingTop: 27,
      paddingLeft: 11,
      paddingRight: 43,
      /*   backgroundColor: 'red',*/
    }}>
    <View>
      <Profile color={color} />
    </View>
  </TouchableOpacity>
);

export const NavBar = forwardRef(
  (
    {
      screen,
      userLoggedIn,
      setScreen,
    }: {
      screen: string;
      userLoggedIn: boolean;
      setScreen: (v: string) => void;
    },
    ref,
  ) => (
    <StyledView ref={ref}>
      <NavBarPanel />
      <StyledFlex>
        <HomeButton
          color={screen === 'menu' ? Color.AMBER : Color.GAINSBORO}
          onPress={() => setScreen('menu')}
        />
        {userLoggedIn ? (
          <OrdersButton
            color={screen === 'orders' ? Color.AMBER : Color.GAINSBORO}
            onPress={() => setScreen('orders')}
          />
        ) : (
          <BookmarksButton
            color={screen === 'bookmarks' ? Color.AMBER : Color.GAINSBORO}
            onPress={() => setScreen('bookmarks')}
          />
        )}
        <CartButton
          focused={screen === 'order'}
          onPress={() => setScreen('order')}
        />
        <QrButton
          color={screen === 'qr' ? Color.AMBER : Color.GAINSBORO}
          onPress={() => {
            resetMenuFetched();
            setScreen('qr');
          }}
        />
        <ProfileButton
          color={screen === 'profile' ? Color.AMBER : Color.GAINSBORO}
          onPress={() => setScreen('profile')}
        />
      </StyledFlex>
    </StyledView>
  ),
);

export const NavContext = createContext<{
  showNavBar: () => void;
  hideNavBar: () => void;
}>({
  showNavBar: () => {},
  hideNavBar: () => {},
});
export const useShowNavBar = () => useContext(NavContext).showNavBar;
export const useHideNavBar = () => useContext(NavContext).hideNavBar;

export const useHideNavBarWhileInFocus = () => {
  const hideNavBar = useHideNavBar();
  const showNavBar = useShowNavBar();

  useFocusEffect(
    useCallback(() => {
      hideNavBar();
      return showNavBar;
    }, []),
  );
};

let startTime = 0;
let duration = 250;
let distance = -120;

let open = true;

export function useNavBar() {
  const navRef = useRef<View>();
  const [animating, setAnimating] = useState(false);

  const hideNavBar = useCallback(() => {
    if (!open) return;
    startTime = performance.now();
    open = false;
    setAnimating(true);
  }, [open]);

  const showNavBar = useCallback(() => {
    if (open) return;
    startTime = performance.now();
    open = true;
    setAnimating(true);
  }, [open]);

  useRafLoop(() => {
    if (!animating) return;

    const time = performance.now();
    let delta = time - startTime;
    if (delta > duration) {
      setAnimating(false);
      delta = duration;
    }
    if (open) delta = easeOutCubic(delta / duration) * duration;
    else delta = easeInCubic(delta / duration) * duration;

    let bottom = (delta / duration) * distance;
    if (open) bottom = distance - bottom;
    navRef.current?.setNativeProps({style: {bottom}});
  });

  return {
    navRef,
    showNavBar,
    hideNavBar,
  };
}
