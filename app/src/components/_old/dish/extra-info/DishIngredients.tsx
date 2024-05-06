import styled from 'styled-components/native';
import {DishInfoLabel} from './DishInfoLabel';
import React from 'react';

const StyledContainer = styled.Text`
  flex-direction: row;
`;

const StyledText = styled.Text`
  font-family: Avenir;
  color: #b2b2b2;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;

const StyledLabel = styled(DishInfoLabel)`
  line-height: 19px;
`;

export const DishIngredients = ({ingredients}: {ingredients: string}) =>
  ingredients.length !== 0 ? (
    <StyledContainer>
      <StyledLabel value={'Ingredients:'} />
      <StyledText>{ingredients}</StyledText>
    </StyledContainer>
  ) : null;
