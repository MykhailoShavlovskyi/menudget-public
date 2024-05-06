import React, {useCallback, useState} from 'react';
import {LoginInput} from '../../components/login/LoginInput';
import {PasswordInput} from '../../components/login/PasswordInput';
import {ForgotPasswordAnchor} from '../../components/login/ForgotPasswordAnchor';
import {LoginRegisterNetworks} from '../../components/login/LoginRegisterNetworks';
import {LoginRegisterButton} from '../../components/login/LoginRegisterButton';
import {login} from '../../api/api';
import {userRetrieved} from '../../store/slice';
import {env} from '../../lib/env';

import {useSessionKey} from '../../lib/storage';

const PasswordRepeatInput = () => (
  <PasswordInput
    value={'password-reset'} // TODO
    onChange={() => {
      //usePasswordRepeatChangeHandler()
    }}
  />
);

const useIsRegisterScreen = () => {
  return false;
};

const PasswordRepeatInputEnabler = () =>
  useIsRegisterScreen() ? <PasswordRepeatInput /> : null;
const MenudgetForgotPasswordAnchor = () => (
  <ForgotPasswordAnchor onPress={() => console.log('NOT IMPLEMENTED')} /> // TODO
);
const PasswordInputs = (props: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <>
    <PasswordInput {...props} />
    <PasswordRepeatInputEnabler />
    <MenudgetForgotPasswordAnchor />
  </>
);

const Networks = () => (
  <LoginRegisterNetworks
    state={'login'} // TODO
  />
);

const Button = ({onPress}: {onPress: () => void}) => (
  <LoginRegisterButton
    title={'Login'} //useLoginRegisterTitle() // TODO
    onPress={onPress}
  />
);

export const MenudgetLoginRegisterInputs = () => {
  // State
  const [email, setEmail] = useState(
    env.DEV_MODE ? 'manager@menudget.com' : '',
  );
  const [password, setPassword] = useState(env.DEV_MODE ? 'test' : '');

  // Handle login
  const {setSessionKey} = useSessionKey();
  const handleLogin = useCallback(async () => {
    const {user, restaurant, tables, dishes, key} = await login(
      email,
      password,
    );
    setSessionKey(key);
    userRetrieved(user, restaurant, tables, dishes);
  }, [email, password]);

  return (
    <>
      <LoginInput value={email} onChange={setEmail} />
      <PasswordInputs value={password} onChange={setPassword} />
      <Networks />
      <Button onPress={handleLogin} />
    </>
  );
};
