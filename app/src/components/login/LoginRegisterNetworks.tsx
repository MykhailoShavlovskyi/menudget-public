import styled from 'styled-components/native';
import React from 'react';
import {Splitter} from '../common/Splitter';
import {Google} from '../icons/social/Google';
import {Apple} from '../icons/social/Apple';
import {Facebook} from '../icons/social/Facebook';

//region Style

const StyledSplitter = styled(Splitter)`
  padding: 0 18px;
  /*margin-top: 70px;*/
  margin-top: 62px;
  margin-bottom: 42px;
`;

const StyledText = styled.Text`
  text-align: center;
  width: 100%;
  color: black;
  font-family: Avenir;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.2px;
`;

const StyledNetworksContainer = styled.View`
  margin: 30px 0 58px;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 14px;
`;

const StyledIconContainer = styled.View`
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
`;

const StyleFacebook = styled(Facebook)`
  transform: scale(0.9);
`;

const StyledGoogle = styled(Google)`
  transform: scale(0.022);
`;

const StyleApple = styled(Apple)`
  transform: scale(0.18);
  margin-top: -10px;
`;

//endregion Style

const Networks = () => (
  <StyledNetworksContainer>
    <StyledIconContainer>
      <StyleFacebook />
    </StyledIconContainer>
    <StyledIconContainer>
      <StyledGoogle />
    </StyledIconContainer>
    <StyledIconContainer>
      <StyleApple />
    </StyledIconContainer>
  </StyledNetworksContainer>
);

export const LoginRegisterNetworks = ({
  state,
}: {
  state: 'login' | 'register';
}) => (
  <>
    <StyledSplitter color={'#ffbd02'} />
    {/*<StyledText>You can also {state} with</StyledText>
    <Networks />*/}
  </>
);
