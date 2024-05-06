import React from 'react';
import {LoginRegisterLayout} from '../components/login/LoginRegisterLayout';
import {
  MenudgetLoginRegisterAnchor,
  MenudgetLoginRegisterHeader,
  MenudgetLoginRegisterLogo,
} from '../containers/login/MenudgetLoginRegisterItems';
import {MenudgetLoginRegisterInputs} from '../containers/login/MenudgetLoginRegisterInputs';

export const LoginRegisterScreen = () => (
  <>
    <LoginRegisterLayout
      Logo={MenudgetLoginRegisterLogo}
      Header={MenudgetLoginRegisterHeader}
      Inputs={MenudgetLoginRegisterInputs}
      Anchor={MenudgetLoginRegisterAnchor}
    />
    {/*<DesignScreen screen={8} />*/}
  </>
);
