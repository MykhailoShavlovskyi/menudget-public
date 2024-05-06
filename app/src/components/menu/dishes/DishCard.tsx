import styled from 'styled-components/native';
import React from 'react';
import {Button} from '../../common/Button';
import {Plus2} from '../../icons/Plus2';
import {currencies} from '../../../lib/currencies';
import {DishSticker} from './DishSticker';
import {TouchableWithoutFeedback, View} from 'react-native';

const StyledContainer = styled.View<{hasSticker: boolean}>`
  width: 100%;
  height: 160px;
  background-color: white;
  margin-top: ${(v: any) => (v.hasSticker ? '10px' : 0)};
  margin-bottom: 8px;
  padding: 12px 10px;
  display: flex;
  flex-direction: row;

  border-radius: 10px;
  box-shadow: 0 0 8px #dddddd;
`;

const StyledImage = styled.Image`
  resize-mode: contain;
  width: 140px;
  height: 136px;
  border-radius: 10px;
  margin-right: 8px;
`;

const StyledInfoContainer = styled.View`
  height: 100%;
  display: flex;
  flex: 1;
  padding: 1px 0 0 2px;
  z-index: 2;
`;

const StyledName = styled.Text`
  width: 100%;
  font-family: Avenir;
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 6px;
`;

const StyledDescription = styled.Text`
  width: 100%;
  margin-bottom: 6px;

  font-weight: 500;
  font-family: Avenir;
  color: #828282;
  font-size: 10px;
  line-height: 14px;
`;

const StyledLabelsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledLabel = styled.View<{color: string}>`
  padding: 2px 6px;
  border-radius: 16px;
  margin-right: 6px;
  background-color: ${(v: any) => v.color};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledLabelImage = styled.Image`
  width: 12px;
  height: 12px;
`;

const StyledLabelText = styled.Text`
  margin-left: 4px;
  font-family: Avenir;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
`;

const StyledPriceContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  position: absolute;
  width: 100%;
  bottom: -8px;
  left: 0;
`;

const StyledPrice = styled.Text`
  font-family: Avenir;
  font-size: 17px;
  font-weight: bold;
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
  spicy,
  vegetarian,
  vegan,
  allergens,
  sticker,
  onPress,
  onAdd,
}: {
  measurement?: string;
  thumbnailUrl?: string;
  name: string;
  description: string;
  colorBorder: boolean;
  color: string;
  price: number;
  currency: string;
  spicy: boolean;
  vegetarian: boolean;
  vegan: boolean;
  allergens: boolean;
  sticker: string | null;
  onPress: () => void;
  onAdd: () => void;
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <StyledContainer
      hasSticker={!!sticker}
      style={
        color ? {borderColor: colorBorder, borderLeftWidth: 4} : undefined
      }>
      <StyledImage
        source={
          thumbnailUrl
            ? {uri: thumbnailUrl}
            : require('../../../../assets/images/placeholder.png')
        }
      />
      {sticker && <DishSticker sticker={sticker} />}

      <StyledInfoContainer>
        <StyledName>{name}</StyledName>
        <StyledDescription>
          {description} {measurement}
        </StyledDescription>

        <StyledLabelsContainer>
          {vegan && (
            <StyledLabel color={'#e5f7e6'}>
              <StyledLabelImage
                source={require('../../../../assets/images/labels/veg.png')}
              />
              <StyledLabelText>Vegan</StyledLabelText>
            </StyledLabel>
          )}
          {spicy && (
            <StyledLabel color={'#ffe5e5'}>
              <StyledLabelImage
                source={require('../../../../assets/images/labels/pepper.png')}
              />
              <StyledLabelText>Spicy</StyledLabelText>
            </StyledLabel>
          )}
          {allergens && (
            <StyledLabel color={'#fff2dd'}>
              <StyledLabelImage
                source={require('../../../../assets/images/labels/nuts.png')}
              />
              {!(vegan && spicy) && (
                <StyledLabelText>Allergens</StyledLabelText>
              )}
            </StyledLabel>
          )}
        </StyledLabelsContainer>

        <StyledPriceContainer>
          <StyledPrice>
            {price}
            {currencies[currency] ?? '$'}
          </StyledPrice>
          <Button
            buttonStyle={{
              width: 55,
              height: 30,
              paddingTop: 8,
              paddingBottom: 8,
              paddingRight: 10,
              paddingLeft: 10,
            }}
            hitSlop={{top: 24, bottom: 24, left: 24, right: 24}}
            colors={['black']}
            icon={<Plus2 />}
            onPress={onAdd}
          />
        </StyledPriceContainer>
      </StyledInfoContainer>
    </StyledContainer>
  </TouchableWithoutFeedback>
);
