import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';
import {Button} from './common/Button';

const StyledContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const StyledImage = styled.Image`
  width: 232px;
  height: 112px;
  margin-bottom: 25px;
`;

const StyledText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: Avenir;
  margin-bottom: 90px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 62px;
  position: absolute;
  bottom: 74px;
`;

export const UpdateAppScreen = () => {
  const handleUpdate = () => {
    const link =
      'itms-apps://apps.apple.com/nl/app/menudget/id1587008469?l=en-GB';
    Linking.canOpenURL(link).then(
      supported => {
        console.debug({supported});
        supported && Linking.openURL(link);
      },
      err => console.log(err),
    );
  };

  return (
    <>
      <StyledContainer>
        <StyledImage
          source={require('../../assets/images/logo-vertical.png')}
        />
        <StyledText>New version is out!</StyledText>
        <StyledButton
          buttonStyle={{width: '100%'}}
          textStyle={{fontSize: 22, fontWeight: 'bold', letterSpacing: 0}}
          onPress={handleUpdate}
          title="Update"
        />
      </StyledContainer>
      {/*  <DesignScreen screen={14} />*/}
    </>
  );
};
