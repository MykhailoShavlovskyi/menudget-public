import {LoginRegisterInput} from './LoginRegisterInput';
import React from 'react';
import styled from 'styled-components/native';
import {Profile} from '../icons/Profile';

const StyledProfile = styled(Profile)`
  transform: scale(0.65) translateX(-9px);
`;

export const LoginInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <LoginRegisterInput
    placeholder={'Login / E-mail'}
    value={value}
    onChange={onChange}
    icon={<StyledProfile color={'#B2B2B2'} />}
  />
);
