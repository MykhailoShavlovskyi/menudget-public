import React from 'react';
import {ArBackButton} from '../../components/ar/content/ArBackButton';
import {ArRestaurantName} from '../../components/ar/content/ArRestaurantName';
import {useRestaurantName} from '../../store/selectors';

export const ArTopContent = ({onExit}: {onExit: () => void}) => (
  <>
    <ArBackButton onGoBack={onExit} />
    <ArRestaurantName value={useRestaurantName() ?? ''} />
  </>
);
