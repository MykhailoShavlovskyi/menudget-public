import React from 'react';
import {useUserEmail, useUserName} from '../store/selectors';
import {UserCard} from '../components/profile/UserCard';
import {ProfileHeading} from '../components/profile/ProfileHeading';
import {Button} from '../components/common/Button';
import {ProfileLayout} from '../components/profile/ProfileLayout';
import styled from 'styled-components/native';
import {useLogout} from '../store/hooks';

const StyledButton = styled(Button)`
  height: 16px;
`;

export const ProfileScreen = () => {
  const name = useUserName();
  const email = useUserEmail();

  const logout = useLogout();

  return (
    <ProfileLayout>
      <ProfileHeading />
      <UserCard name={name ?? ''} email={email ?? ''} />
      <StyledButton
        title={'Sign out'}
        onPress={logout}
        style={{height: 48, marginBottom: 16}}
        buttonStyle={{height: 48}}
        textStyle={{fontSize: 16}}
      />
    </ProfileLayout>
  );
};
