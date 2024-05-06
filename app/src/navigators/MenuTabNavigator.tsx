import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {createContext, useContext} from 'react';
import {QrScreen} from '../screens/QrScreen';
import {MenuStackNavigator} from './MenuStackNavigator';
import {setScreen} from '../store/slice';
import {NavBar, NavContext, useNavBar} from '../components/NavBar';
import {BookmarksStackNavigator} from './BookmarksStackNavigator';
import {LoginRegisterScreen} from '../screens/LoginRegister';
import {NotificationBar} from '../containers/NotfiicationBar';
import {useScreen, useUserLoggedIn} from '../store/selectors';
import {ProfileScreen} from '../screens/ProfileScreen';
import {OrdersScreen} from '../screens/OrdersScreen';
import {
  NotificationBarContext,
  useNotificationBar,
} from '../components/notification-bar/NotificationBar';
import {Receipt} from '../containers/receipt/Receipt';
import {StatusBar, View} from 'react-native';
import {ReceiptContext, useReceipt} from '../components/receipt/ReceiptContext';
import {DesignScreen} from '../components/common/DesignScreen';

type ParamList = {
  Default: undefined;
  Menu: undefined;
  Bookmarks: undefined;
  Receipt: undefined;
  QR: undefined;
  Profile: undefined;
};
type Props = NativeStackScreenProps<ParamList, 'Default'>;
export type MenuTabNavigation = Props['navigation'];

const RestaurantContext = createContext<{id?: number}>({id: undefined});
export const useRestaurantId = () => useContext(RestaurantContext).id;

export const MenuTabNavigator = ({route}: {route: any}) => {
  const restaurantId = route?.params?.restaurantId;
  const loggedIn = useUserLoggedIn();
  const screen = useScreen();

  // Use notification bar
  const {notificationBarRef, showNotificationBar, hideNotificationBar} =
    useNotificationBar();

  // Use navigation bar
  const {navRef, showNavBar, hideNavBar} = useNavBar();

  // Use receipt
  const {
    bottom: receiptBottom,
    opacity,
    showReceipt,
    hideReceipt,
  } = useReceipt();

  // Render
  const getStatusBarStyle = () => {
    switch (screen) {
      case 'qr':
        return 'light-content';
      default:
        return 'dark-content';
    }
  };
  const getScreen = () => {
    switch (screen) {
      case 'menu':
        return <MenuStackNavigator />;
      case 'bookmarks':
        return <BookmarksStackNavigator />;
      case 'orders':
        return <OrdersScreen />;
      case 'qr':
        return <QrScreen />;
      case 'profile':
        return loggedIn ? <ProfileScreen /> : <LoginRegisterScreen />;
    }
    return null;
  };
  return (
    <>
      <StatusBar barStyle={getStatusBarStyle()} />
      <RestaurantContext.Provider value={{id: restaurantId}}>
        <NavContext.Provider value={{showNavBar, hideNavBar}}>
          <NotificationBarContext.Provider
            value={{showNotificationBar, hideNotificationBar}}>
            <ReceiptContext.Provider value={{showReceipt, hideReceipt}}>
              <View
                style={{position: 'absolute', width: '100%', height: '100%'}}>
                {getScreen()}
              </View>
              {loggedIn && <NotificationBar ref={notificationBarRef} />}
              <NavBar
                ref={navRef}
                screen={screen}
                userLoggedIn={loggedIn}
                setScreen={(s: string) => {
                  if (s === 'order') {
                    showReceipt();
                  } else {
                    setScreen(s);
                  }
                }}
              />
              <Receipt
                bottom={receiptBottom}
                opacity={opacity}
                onHide={hideReceipt}
              />
              {/*  <DesignScreen screen={18} />*/}
              {/* <DesignScreen screen={16} />*/}
              {/* <DesignScreen screen={17} />*/}
            </ReceiptContext.Provider>
          </NotificationBarContext.Provider>
        </NavContext.Provider>
      </RestaurantContext.Provider>
    </>
  );
};
