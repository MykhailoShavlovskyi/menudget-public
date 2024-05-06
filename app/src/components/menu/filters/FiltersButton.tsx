import styled from 'styled-components/native';
import React from 'react';
import {Button} from '../../common/Button';

const StyledContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 37px;
  padding-bottom: 50px;
  transform: scale(0.75);
`;

export const FiltersButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => (
  <StyledContainer>
    <Button onPress={onPress} title={title} />
  </StyledContainer>
);
