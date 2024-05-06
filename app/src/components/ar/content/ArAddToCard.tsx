import React from 'react';
import styled from 'styled-components/native';
import {AddToCard} from '../../shared/AddToCard';
import {css} from 'styled-components';

const StyledAddToCard = styled(AddToCard)<{disabled: boolean}>`
  width: 300px;
  padding: 0;

  margin: 2px 4px;
  align-items: flex-end;

  ${(v: any) =>
    v.disabled &&
    css`
      //TODO
    `}
`;

export const ArAddToCard = ({
  price,
  currency,
  disabled,
  onAdd,
}: {
  price: number;
  currency: string;
  disabled: boolean;
  onAdd: () => void;
}) => (
  <StyledAddToCard
    price={price}
    currency={currency}
    noMessage={true}
    disabled={disabled}
    onAdd={onAdd}
  />
);
