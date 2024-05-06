import React from 'react';
import {LoginRegisterLogoHeader} from '../../components/login/LoginRegisterLogoHeader';
import {LoginRegisterHeader} from '../../components/login/LoginRegisterHeader';
import {LoginRegisterAnchor} from '../../components/login/LoginRegisterAnchor';

export const MenudgetLoginRegisterLogo = () => <LoginRegisterLogoHeader />;

export const MenudgetLoginRegisterHeader = () => (
  <LoginRegisterHeader value={'Login'} /> //useLoginRegisterTitle()  // TODO
);

export const MenudgetLoginRegisterAnchor = () => {
  return <></>;
  return (
    <LoginRegisterAnchor
      state={'login'} // TODO
      onPress={() => {
        //useToggleLoginRegister() // TODO
      }}
    />
  );
};
