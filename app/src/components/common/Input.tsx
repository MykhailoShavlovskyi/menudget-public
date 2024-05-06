import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';

const StyledContainer = styled.View<{flex?: boolean}>`
  flex-direction: row;
  align-items: center;

  ${(p: any) => (p.flex ? 'flex: 1' : '')};
`;

const StyledIconContainer = styled.View<{iconMargin?: string}>`
  position: absolute;
  z-index: 1;
  margin-left: ${(p: any) => p.iconMargin ?? '34px'};
  padding-bottom: 15px;
`;

const TextInput = styled.TextInput<{hasIcon: boolean}>`
  flex: 1;
  padding: 19px 19px 19px ${(p: any) => (p.hasIcon ? '62px' : '30px')};

  border-radius: 32px;
  background-color: #f4f4f4;
  color: #b2b2b2;

  font-family: Avenir;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const Input = ({
  icon,
  value,
  placeholder,
  multiline,
  flex,
  iconMargin,
  onFocus,
  onChange,
  ...rest
}: {
  icon?: ReactNode;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  flex?: boolean;
  iconMargin?: string;
  onFocus?: () => void;
  onChange: (v: string) => void;
} & Omit<TextInputProps, 'onChange'>) => (
  <StyledContainer flex={flex}>
    {icon && (
      <StyledIconContainer iconMargin={iconMargin}>{icon}</StyledIconContainer>
    )}
    <TextInput
      onChangeText={onChange}
      value={value}
      editable
      maxLength={30}
      placeholder={placeholder}
      placeholderTextColor={'#b2b2b2'}
      hasIcon={icon != null}
      iconMargin={iconMargin}
      multiline={multiline}
      onPressIn={onFocus}
      scrollEnabled={false}
      {...rest}
    />
  </StyledContainer>
);
