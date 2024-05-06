import React from 'react';
import {BackButton} from '../../common/BackButton';

export const ArBackButton = ({onGoBack}: {onGoBack: () => void}) => (
  <BackButton color={'white'} onPress={onGoBack} />
);
