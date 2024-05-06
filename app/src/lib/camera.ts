import {useCallback, useLayoutEffect, useState} from 'react';
//import {Camera} from 'react-native-camera-kit';

export function useQrScanner() {
  const [isInitialized, setIsInitialized] = useState(true);
  const [isAllowed, setIsAllowed] = useState(true);

  useLayoutEffect(() => {
    /*
    Camera.checkDeviceCameraAuthorizationStatus().then((v: boolean) => {
      setIsInitialized(true);
      setIsAllowed(v);
    });*/
  });

  const getPermissions = useCallback(() => {
    /*
    Camera.requestDeviceCameraAuthorization().then((v: boolean) => {
      setIsAllowed(v);
    });*/
  }, []);

  return {isInitialized, isAllowed, getPermissions};
}
