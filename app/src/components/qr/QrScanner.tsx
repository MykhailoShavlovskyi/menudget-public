import React from 'react';
import {Camera, CameraType} from 'react-native-camera-kit';

export const QrScanner = ({
  handleScan,
}: {
  handleScan: (restaurantId: number, tableId: number) => void;
}) => (
  <Camera
    style={{position: 'absolute', width: '100%', height: '100%'}}
    cameraType={CameraType.Back}
    flashMode="auto"
    scanBarcode={true}
    onReadCode={(event: any) => {
      const qrLink = event.nativeEvent.codeStringValue;
      const restaurantId = qrLink.split('restaurantId=')[1].split('&')[0];
      const tableId = qrLink.split('&table=')[1];
      handleScan(Number(restaurantId), Number(tableId));
    }}
  />
);
