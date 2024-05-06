import styled from 'styled-components/native';
import {Button} from '../common/Button';
import React, {useState} from 'react';
import {ConfirmOrderModal} from './ConfirmOrderModal';

const StyledContainer = styled.View`
  display: flex;
  width: 100%;
  margin-top: 7px;
`;

const StyledPriceLine = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledLabel = styled.Text`
  color: #b6b6b6;
  font-size: 20px;
  margin-bottom: 9px;
  font-weight: 500;
  font-family: Avenir;
`;

const StyledValue = styled.Text`
  color: #b6b6b6;
  font-weight: bold;
  font-size: 20px;
  font-family: Avenir;
`;

const StyledTotalLabel = styled(StyledLabel)`
  font-size: 22px;
  color: black;
  font-weight: 900;
  margin-bottom: 16px;
`;

const StyledTotalValue = styled(StyledValue)`
  font-size: 22px;
  color: black;
  font-weight: 900;
`;

// TODO currency

export const ReceiptFooter = ({
  subTotal,
  discount,
  promo,
  orderDisabled,
  onOrder,
}: {
  subTotal: number;
  promo: number;
  discount: number;
  orderDisabled: boolean;
  onOrder: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  console.debug({orderDisabled});

  return (
    <>
      <StyledContainer>
        {(promo !== 0 || discount !== 0) && (
          <StyledPriceLine>
            <StyledLabel>Subtotal</StyledLabel>
            <StyledValue>{subTotal}$</StyledValue>
          </StyledPriceLine>
        )}
        {promo !== 0 && (
          <StyledPriceLine>
            <StyledLabel>Promo</StyledLabel>
            <StyledValue>-{promo}$</StyledValue>
          </StyledPriceLine>
        )}
        {discount !== 0 && (
          <StyledPriceLine>
            <StyledLabel>Discount</StyledLabel>
            <StyledValue>-{discount}$</StyledValue>
          </StyledPriceLine>
        )}

        <StyledPriceLine>
          <StyledTotalLabel>Total</StyledTotalLabel>
          <StyledTotalValue>{subTotal - promo - discount}$</StyledTotalValue>
        </StyledPriceLine>
        <Button
          buttonStyle={{width: '100%'}}
          textStyle={{fontSize: 20, fontWeight: 'bold', letterSpacing: 0}}
          onPress={() => setModalOpen(true)}
          title="Order"
          disabled={orderDisabled}
        />
      </StyledContainer>
      <ConfirmOrderModal
        open={modalOpen}
        onConfirm={() => {
          onOrder();
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};
