import styled from 'styled-components/native';
import React from 'react';
import {Button} from '../common/Button';

const StyledButton = styled(Button)`
  justify-content: center;
  flex-direction: row;
  height: 48px;
`;

export const LoginRegisterButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <StyledButton
    buttonStyle={{height: 48, borderRadius: 16}}
    textStyle={{fontSize: 16}}
    title={title}
    onPress={onPress}
  />
);
