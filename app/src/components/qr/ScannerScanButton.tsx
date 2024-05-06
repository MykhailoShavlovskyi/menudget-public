import React from 'react';
import {Button} from '../common/Button';

export const ScannerScanButton = ({onPress}: {onPress: () => void}) => (
  <Button title={'Scan'} onPress={onPress} />
);
