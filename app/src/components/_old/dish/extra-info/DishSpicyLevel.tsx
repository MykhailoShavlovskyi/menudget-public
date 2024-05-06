import styled from 'styled-components/native';
import {DishInfoLabel} from './DishInfoLabel';
import React from 'react';
import {Chilli} from '../../../icons/Chili';
import {fillByIndex} from '../../../../lib/fillByIndex';

const StyledContainer = styled.Text`
  flex-direction: row;
  margin-bottom: 20px;
`;

const StyledChillisContainer = styled.View`
  flex-direction: row;
`;

const StyledChilli = styled(Chilli)`
  margin-top: 2px;
  margin-left: 3px;
  margin-right: -4.2px;
  transform: scale(0.9);
`;

export const DishSpicyLevel = ({value}: {value: number}) => {
  const chillis = fillByIndex(i => <StyledChilli key={i} />, value);

  if (value === 0) {
    return null;
  }
  return (
    <StyledContainer>
      <DishInfoLabel value={'Spicy level: '} />
      <StyledChillisContainer>{chillis}</StyledChillisContainer>
    </StyledContainer>
  );
};
