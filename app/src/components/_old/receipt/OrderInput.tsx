import styled from 'styled-components/native';
import React from 'react';
import {Input} from '../../common/Input';

const StyledContainer = styled.View<{big?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: ${(p: any) => (p.big ? 'flex-start' : 'center')};
  margin-bottom: 11px;
`;

const StyledText = styled.Text<{big?: boolean}>`
  width: 98px;
  color: black;
  margin-top: ${(p: any) => (p.big ? '10px' : '0')};
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
`;

const StyledInput = styled(Input)<{big?: boolean}>`
  padding: 16px 25px;
  height: ${(p: any) => (p.big ? '95px' : '100%')};
`;

export const OrderInput = ({
  title,
  value,
  placeholder,
  big,
  editable,
  onFocus,
  onChange,
  ...rest
}: {
  title: string;
  value: string;
  placeholder: string;
  big?: boolean;
  editable?: boolean;
  onFocus?: () => void;
  onChange: (v: string) => void;
}) => (
  <StyledContainer big={big} {...rest}>
    <StyledText big={big}>{title}</StyledText>
    <StyledInput
      value={value}
      placeholder={placeholder}
      big={big}
      flex={true}
      multiline={big}
      editable={editable}
      onFocus={onFocus}
      onChange={onChange}
    />
  </StyledContainer>
);
