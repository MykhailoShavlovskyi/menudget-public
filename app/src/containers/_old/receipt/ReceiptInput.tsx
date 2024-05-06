import React from 'react';
import styled from 'styled-components/native';
import {OrderInput} from '../../../components/_old/receipt/OrderInput';
import {noop} from 'lodash';
import {setOrderNotes, setOrderPromo} from '../../../store/slice';
import {
  useOrderNotes,
  useOrderPromo,
  useOrderTableName,
} from '../../../store/selectors';

const StyledContainer = styled.View`
  margin-top: 28px;
  padding-bottom: 16px;
`;

const TableInput = () => (
  <OrderInput
    title={'Table'}
    placeholder={'Number'}
    value={useOrderTableName() ?? ''}
    editable={false}
    onChange={noop}
  />
);
const NotesInput = ({onFocus}: {onFocus?: () => void}) => (
  <OrderInput
    title={'Notes'}
    placeholder={'Tell us what do you want else?'}
    value={useOrderNotes()}
    big={true}
    onFocus={onFocus}
    onChange={setOrderNotes}
  />
);
const PromoInput = ({onFocus}: {onFocus?: () => void}) => (
  <OrderInput
    title={'Promo'}
    placeholder={'Promo code'}
    value={useOrderPromo()}
    onFocus={onFocus}
    onChange={setOrderPromo}
  />
);

export const ReceiptInput = ({onFocus}: {onFocus?: () => void}) => (
  <StyledContainer>
    <TableInput />
    <NotesInput onFocus={onFocus} />
    <PromoInput onFocus={onFocus} />
  </StyledContainer>
);
