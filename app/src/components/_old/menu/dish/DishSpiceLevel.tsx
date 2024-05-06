import React from 'react';
import styled from 'styled-components/native';
import {Chilli} from '../../../icons/Chili';

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: -5px;
`;

const StyledChilli = styled(Chilli)`
  transform: scale(0.75);
  margin-left: -1px;
  margin-right: -2px;
`;

export const DishSpiceLevel = ({value}: {value: number}) => {
  const chillis = [];
  for (let i = 0; i < value; i++) {
    if (i > 5) break;
    chillis.push(<StyledChilli key={i} />);
  }
  return <StyledContainer>{chillis}</StyledContainer>;
};
