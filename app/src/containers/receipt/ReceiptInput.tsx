import React from 'react';
import styled from 'styled-components/native';
import {noop} from 'lodash';
import {ReceiptInput as Input} from '../../components/receipt/ReceiptInput';
import {
  useOrderNotes,
  useOrderPromo,
  useOrderTableName,
} from '../../store/selectors';
import {setOrderNotes, setOrderPromo} from '../../store/slice';

const StyledContainer = styled.View`
  margin-top: 26px;
  padding-bottom: 16px;
`;

const TableInput = () => (
  <Input
    title={'Table'}
    placeholder={'Number'}
    value={useOrderTableName() ?? ''}
    editable={false}
    onChange={noop}
  />
);
const NotesInput = ({onFocus}: {onFocus?: () => void}) => (
  <Input
    title={'Notes'}
    placeholder={'Tell us what do you want else?'}
    value={useOrderNotes()}
    big={true}
    onFocus={onFocus}
    onChange={setOrderNotes}
  />
);
const PromoInput = ({onFocus}: {onFocus?: () => void}) => (
  <Input
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
