import React from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {DishAddButton} from './DishAddButton';
import {DishHeader} from './DishHeader';
import {DishThumbnail} from './DishThumbnail';
import {DishName} from './DishName';
import {DishDescription} from './DishDescription';
import {DishSpiceLevel} from './DishSpiceLevel';
import {DishPrice} from './DishPrice';

const StyledContainer = styled.View<{borderColor: string}>`
  background-color: white;
  border-radius: 27px;
  margin-right: 22px;
  margin-bottom: 42px;
  padding: 13px;
  width: 180px;
  height: 245px;
  box-shadow: 0 0 8px ${(v: {borderColor: string}) => v.borderColor};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledHeadContainer = styled.View`
  display: flex;
  position: relative;
`;

const StyledBottomContainer = styled.View`
  display: flex;
  align-items: center;
`;

const StyledPriceAndSpicyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /*  justify-content: space-between;*/
  padding: 0 12px 12px;

  width: 100%;
`;

const StyledButtonContainer = styled.View`
  display: flex;
  position: absolute;
  top: 32px;
`;

export const StyledDishCardSkeleton = styled(StyledContainer)`
  background-color: #e3e3e3;
  box-shadow: 0 0 8px transparent;
`;

export const DishCard = ({
  measurement,
  thumbnailUrl,
  name,
  description,
  colorBorder,
  color,
  price,
  currency,
  sticker,
  spicyLevel,
  onAdd,
  onPress,
}: {
  measurement?: string;
  thumbnailUrl?: string;
  name: string;
  description: string;
  colorBorder: boolean;
  color: string;
  price: number;
  currency: string;
  sticker: string | null;
  spicyLevel: number;
  onPress: () => void;
  onAdd: () => void;
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <StyledContainer borderColor={colorBorder ? color : '#dddddd'}>
      <StyledHeadContainer>
        <DishHeader measurement={measurement} sticker={sticker} />
        <DishThumbnail uri={thumbnailUrl} />
        <DishName value={name} />
        <DishDescription value={description} />
      </StyledHeadContainer>

      <StyledBottomContainer>
        <StyledPriceAndSpicyContainer>
          <DishPrice
            value={price}
            currency={currency}
            noSpicyLevel={spicyLevel === 0}
          />
          {spicyLevel !== 0 && <DishSpiceLevel value={spicyLevel} />}
        </StyledPriceAndSpicyContainer>

        <StyledButtonContainer>
          <DishAddButton onPress={onAdd} />
        </StyledButtonContainer>
      </StyledBottomContainer>
    </StyledContainer>
  </TouchableWithoutFeedback>
);
