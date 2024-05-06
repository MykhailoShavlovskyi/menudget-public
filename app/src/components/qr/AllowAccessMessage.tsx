import styled from 'styled-components/native';
import {Button} from 'react-native';
import React from 'react';

const StyledMessageWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledMessage = styled.Text`
  font-size: 30px;
  text-align: center;
`;

export const AllowAccessMessage = ({
  onAllowAccessPress,
}: {
  onAllowAccessPress: () => void;
}) => (
  <StyledMessageWrapper>
    <StyledMessage>Please, allow access to the camera!</StyledMessage>
    <Button title="Allow" onPress={onAllowAccessPress} />
  </StyledMessageWrapper>
);
