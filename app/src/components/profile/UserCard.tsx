import styled from 'styled-components/native';
import React from 'react';
import {Dimensions} from 'react-native';
import {StyledRestaurantLogo} from '../menu/header/RestaurantLogo';

const StyledView = styled.View`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 32px;
  box-shadow: 0 0 8px #dddddd;

  display: flex;
  align-items: center;
`;

const StyledAvatar = styled.Image`
  background: #dedfe0;
  width: 80px;
  height: 80px;
  border-radius: 64px;
  margin-bottom: 16px;
`;

const StyledName = styled.Text`
  color: black;
  font-family: Avenir;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.5px;
`;

const StyledEmail = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  color: #b2b2b2;

  padding-top: 6px;
  margin: 0 40px 3px;
  text-align: center;
  line-height: 12px;
  overflow: visible;
`;

export const UserCard = ({name, email}: {name: string; email: string}) => (
  <StyledView
    style={{
      width: Dimensions.get('window').width - 48,
    }}>
    <StyledAvatar
      source={require('../../../assets/images/user-placeholder.png')}
    />
    <StyledName>{name}</StyledName>
    <StyledEmail>{email}</StyledEmail>
  </StyledView>
);
