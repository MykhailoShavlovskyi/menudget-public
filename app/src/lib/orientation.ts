import Orientation from '@hortau/react-native-orientation-locker';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

export function usePortrait() {
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
    }, []),
  );
}
