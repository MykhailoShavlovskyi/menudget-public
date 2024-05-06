import styled from 'styled-components/native';
import React, {useState} from 'react';
import {Button} from '../common/Button';
import {ConfirmOrderModal} from '../receipt/ConfirmOrderModal';
import {noop} from 'lodash';
import {css} from 'styled-components';
import {currencies} from '../../lib/currencies';

//region Style

const StyledContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 46px;
  padding-bottom: 5px;
`;

const StyledPriceContainer = styled.View`
  align-items: center;
  width: 100px;
`;

const StyledMessageText = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  color: #b2b2b2;
  position: absolute;
  bottom: 46px;
`;

const StyledPriceText = styled.Text`
  padding-top: 3px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 27px;
  color: #ffbd02;
`;

//endregion Style

export const AddToCard = ({
  disabled,
  price,
  currency,
  onAdd,
  noMessage,
  ...rest
}: {
  disabled: boolean;
  price: number;
  currency: string;
  noMessage?: boolean;
  onAdd: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <StyledContainer {...rest}>
        <StyledPriceContainer>
          {!noMessage && <StyledMessageText>Total:</StyledMessageText>}
          <StyledPriceText>
            {Number(price).toFixed(2)}
            {currencies[currency] ?? '$'}
          </StyledPriceText>
        </StyledPriceContainer>
        <Button
          onPress={() => setModalOpen(true)}
          title="Order"
          disabled={disabled}
        />
      </StyledContainer>
      <ConfirmOrderModal
        open={modalOpen}
        onConfirm={() => {
          onAdd();
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};
