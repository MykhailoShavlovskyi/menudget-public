import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Screen} from '../lib/Screen';
import {TutorialScreen} from '../screens/TutorialScreen';
import {QrScreen} from '../screens/QrScreen';
import {MenuTabNavigator} from './MenuTabNavigator';
import {ArScreen} from '../screens/ArScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {
  useSaveBookmarksToStorage,
  useSaveOrderToStorage,
  useSessionKey,
} from '../lib/storage';
import {useMount} from 'react-use';
import {authorizeSession, getMinAppVersion} from '../api/api';
import {userRetrieved} from '../store/slice';
import {useUserLoggedIn} from '../store/selectors';
import {appVersion, env} from '../lib/env';
import {UpdateAppScreen} from '../components/UpdateAppScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import {NoInternetScreen} from '../components/NoInternetScreen';
import styled from 'styled-components/native';

export type ParamList = {
  Default: undefined;
  Welcome: undefined;
  Tutorial1: undefined;
  Tutorial2: undefined;
  Tutorial3: undefined;
  QR: undefined;
  Menu: undefined;
  AR: {dishId: number; count: number};
};
type Props = NativeStackScreenProps<ParamList, 'Default'>;
export type RootStackNavigation = Props['navigation'];

export type WelcomeNavigation = NativeStackScreenProps<
  ParamList,
  'Welcome'
>['navigation'];

type ArProps = NativeStackScreenProps<ParamList, 'AR'>;
export type ArNavigation = ArProps['navigation'];
export type ArRoute = ArProps['route'];

const Stack = createNativeStackNavigator();

const StyledPlaceholder = styled.View`
  flex: 1;
  background-color: #ff8b01;
`;

// Authorize active session
function useSession() {
  const [sessionAuthorized, setSessionAuthorized] = useState(false);
  const {sessionKey, setSessionKey} = useSessionKey();
  useMount(async () => {
    if (sessionKey) {
      authorizeSession(sessionKey)
        .then(result => {
          if (result == false) {
            setSessionKey(null);
          } else {
            const {user, restaurant, tables, dishes} = result;
            userRetrieved(user, restaurant, tables, dishes);
          }
          setSessionAuthorized(true);
        })
        .catch(() => setSessionAuthorized(true));
    } else {
      setSessionAuthorized(true);
    }
  });

  return sessionAuthorized;
}

// Checks if app needs update or not
function useRequestAppUpdate() {
  const [completedVersionCheck, setCompletedVersionCheck] = useState(false);
  const [curentVersionApproved, setCurrentVersionApproved] = useState(false);

  useMount(async () => {
    const {value: requiredMinVersion} = await getMinAppVersion();
    if (requiredMinVersion <= appVersion) {
      setCurrentVersionApproved(true);
    }
    setCompletedVersionCheck(true);
  });

  return {curentVersionApproved, completedVersionCheck};
}

const Navigator = () => {
  const {curentVersionApproved, completedVersionCheck} = useRequestAppUpdate();
  const sessionAuthorized = useSession();
  const loggedIn = useUserLoggedIn();

  if (!completedVersionCheck || !sessionAuthorized) {
    return <StyledPlaceholder />;
  }
  if (!curentVersionApproved) {
    return <UpdateAppScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        loggedIn ? Screen.Menu : env.DEV_MODE ? Screen.QR : Screen.Welcome
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screen.Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screen.Tutorial1} component={TutorialScreen} />
      <Stack.Screen name={Screen.Tutorial2} component={TutorialScreen} />
      <Stack.Screen name={Screen.Tutorial3} component={TutorialScreen} />
      <Stack.Screen name={Screen.QR} component={QrScreen} />
      <Stack.Screen
        name={Screen.Menu}
        component={MenuTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Screen.AR}
        component={ArScreen}
        options={{headerShown: false, animation: 'none'}}
      />
    </Stack.Navigator>
  );
};

export const RootStackNavigator = () => {
  useSaveBookmarksToStorage();
  useSaveOrderToStorage();

  const netInfo = useNetInfo();
  if (!netInfo.isConnected) {
    return <NoInternetScreen />;
  }

  return <Navigator />;
};
