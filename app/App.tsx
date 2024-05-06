import React from 'react';
import '@babylonjs/loaders/glTF'; // TODO remove?
import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigator} from './src/navigators/RootStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
