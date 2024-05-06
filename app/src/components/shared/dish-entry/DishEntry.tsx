import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {RemoveDishEntryButton} from './RemoveDishEntryButton';
import {DishEntryCount} from './DishEntryCount';
import {DishEntryThumbnail} from './DishEntryThumbnail';
import {DishEntryName} from './DishEntryName';
import {DishEntryPrice} from './DishEntryPrice';
import React from 'react';

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const StyledNamePriceContainer = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const StyledPlaceholder = styled.View`
  width: 28px;
`;

export const DishEntry = ({
  name,
  price,
  thumbnailUrl,
  count,
  cantRemove,
  noRemoveBtn,
  onPress,
  onRemove,
  ...rest
}: {
  name: string;
  price: number;
  thumbnailUrl?: string;
  count?: number;
  cantRemove?: boolean;
  noRemoveBtn?: boolean;
  onPress: () => void;
  onRemove: () => void;
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <StyledContainer {...rest}>
      {count != null && <DishEntryCount count={count} />}
      <DishEntryThumbnail uri={thumbnailUrl} />
      <StyledNamePriceContainer>
        <DishEntryName value={name} />
        <DishEntryPrice value={price} />
      </StyledNamePriceContainer>
      {!noRemoveBtn ? (
        <RemoveDishEntryButton disabled={cantRemove} onPress={onRemove} />
      ) : (
        <StyledPlaceholder />
      )}
    </StyledContainer>
  </TouchableWithoutFeedback>
);
