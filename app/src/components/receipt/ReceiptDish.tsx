import styled from 'styled-components/native';
import React from 'react';
import {ReceiptDishThumbnail} from './ReceiptDishThumnbail';
import {Button} from '../common/Button';
import {Minus2} from '../icons/Minus2';
import {Plus2} from '../icons/Plus2';
import {Trash} from '../icons/Trash';

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 8px 0 4px;
`;

const StyledNamePriceContainer = styled.View<{noBottomPadding: boolean}>`
  margin-left: 9px;
  padding-top: 1px;
  padding-bottom: ${(v: any) => (v.noBottomPadding ? '1px' : '4px')};
`;

const StyledName = styled.Text`
  color: black;
  font-family: Avenir;
  font-weight: 900;
  font-size: 15px;
  flex: 1;
`;

const StyledPriceContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledPrice = styled.Text`
  font-family: Avenir;
  font-weight: 900;
  font-size: 15px;
  color: #ff9c00;
`;

const StyledBasePrice = styled.Text`
  font-family: Avenir;
  font-weight: 500;
  font-size: 13px;
  color: #b6b6b6;
`;

const StyledActualPriceContainer = styled.View`
  background-color: #fff2dd;
  border-radius: 16px;
  padding: 3px 6px;
  margin-left: 4px;
`;

const StyledCounterContainer = styled.View`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCount = styled.Text`
  width: 40px;
  text-align: center;
  font-size: 22px;
  font-weight: 900;
  font-family: Avenir;
`;

export const ReceiptDish = ({
  name,
  basePrice,
  price,
  thumbnailUrl,
  count,
  finalized,
  onIncrease,
  onDecrease,
  ...rest
}: {
  name: string;
  basePrice: number;
  price: number;
  thumbnailUrl?: string;
  count: number;
  finalized: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}) => (
  <StyledContainer {...rest}>
    <ReceiptDishThumbnail uri={thumbnailUrl} />
    <StyledNamePriceContainer noBottomPadding={basePrice !== price}>
      <StyledName>{name}</StyledName>
      {basePrice === price ? (
        <StyledPrice>{price}$</StyledPrice>
      ) : (
        <StyledPriceContainer>
          <StyledBasePrice
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}>
            {basePrice}$
          </StyledBasePrice>
          <StyledActualPriceContainer>
            <StyledPrice>{price}$</StyledPrice>
          </StyledActualPriceContainer>
        </StyledPriceContainer>
      )}
    </StyledNamePriceContainer>
    <StyledCounterContainer>
      {!finalized && (
        <Button
          buttonStyle={{
            width: 36,
            height: 36,
          }}
          colors={['black']}
          icon={count === 1 ? <Trash /> : <Minus2 />}
          onPress={onDecrease}
        />
      )}
      <StyledCount>{count}</StyledCount>
      {!finalized && (
        <Button
          buttonStyle={{
            width: 36,
            height: 36,
          }}
          colors={[(count ?? 0) < 99 ? '#E3E3E3' : 'black']}
          icon={<Plus2 />}
          disabled={(count ?? 0) >= 99}
          onPress={onIncrease}
        />
      )}
    </StyledCounterContainer>
  </StyledContainer>
);
