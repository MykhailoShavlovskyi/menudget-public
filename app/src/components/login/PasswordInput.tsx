import {LoginRegisterInput} from './LoginRegisterInput';
import React from 'react';
import {Lock} from '../icons/Lock';

export const PasswordInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <LoginRegisterInput
    placeholder={'Password'}
    value={value}
    onChange={onChange}
    icon={<Lock />}
  />
);
