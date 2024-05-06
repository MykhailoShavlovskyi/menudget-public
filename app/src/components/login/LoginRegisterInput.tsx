import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {Input} from '../common/Input';

const StyledInput = styled(Input)`
  margin-bottom: 14px;
  height: 55px;
  padding-left: 52px;
`;

export const LoginRegisterInput = ({
  value,
  placeholder,
  onChange,
  icon,
}: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  icon?: ReactNode;
}) => (
  <StyledInput
    value={value}
    placeholder={placeholder}
    icon={icon}
    iconMargin={'26px'}
    onChange={onChange}
  />
);
