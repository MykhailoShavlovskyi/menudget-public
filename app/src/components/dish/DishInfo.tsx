import styled from 'styled-components/native';
import {compact} from 'lodash';
import React from 'react';
import {css} from 'styled-components';

const StyledContainer = styled.View`
  padding: 3px 16px 0;
`;

const StyledNameContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledName = styled.Text`
  margin-right: 14px;
  margin-bottom: 10px;
  font-family: Avenir;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 0.08px;
`;

// TODO more colors
const StyledLabel = styled.View<{value: string}>`
  margin-right: 8px;
  margin-bottom: 10px;
  padding: 2px 8px;
  border-radius: 16px;

  ${(v: any) =>
    (v.value === 'Vegan' || v.value === 'Vegetarian') &&
    css`
      background-color: #e5f7e6;
    `}
  ${(v: any) =>
    v.value === 'Spicy' &&
    css`
      background-color: #ffe5e5;
    `}
`;

const StyledLabelText = styled.Text`
  font-family: Avenir;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
`;

const StyledDescription = styled.Text`
  margin-top: 9px;
  margin-bottom: 10px;
  font-family: Avenir;
  font-size: 13px;
  font-weight: 500;
  color: #828282;
`;

const StyledGroup = styled.View<{noBorder?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  ${(v: any) =>
    !v.noBorder &&
    css`
      border-bottom-color: #f5f5f5;
      border-bottom-width: 1px;
    `}
`;

const StyledGroupLabel = styled.Text`
  font-family: Avenir;
  font-size: 15px;
  font-weight: 500;
`;

const StyledGroupValue = styled.Text`
  font-family: Avenir;
  font-size: 13px;
  font-weight: 400;
`;

const StyledProps = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledProp = styled.View<{hasBorder: boolean}>`
  display: flex;
  align-items: center;

  ${(v: any) =>
    v.hasBorder &&
    css`
      border-right-color: #e3e3e3;
      border-right-width: 2px;
    `}
`;

const StyledPropLabel = styled.Text`
  width: 89px;
  margin-bottom: 4px;
  font-family: Avenir;
  font-size: 10px;
  color: #828282;
  font-weight: 700;
  text-align: center;
`;

const StyledPropValue = styled.Text`
  font-family: Avenir;
  font-size: 10px;
  color: #828282;
  font-weight: 500;
`;

// TODO optional ingredients -> no border bottom
// TODO optional allergens -> no border bottom

export const DishInfo = ({
  name,
  labels,
  description,
  measurement,
  ingredients,
  spicyLevel,
  allergens,
  calories,
  protein,
  fat,
  carbs,
}: {
  name: string;
  labels: string[];
  description: string;
  measurement: string;
  ingredients: string;
  spicyLevel: number;
  allergens: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbs: number | null;
}) => {
  const manyProps = compact([calories, protein, fat, carbs]).length > 2;
  const lastProp = compact([
    calories != null ? 'calories' : undefined,
    protein != null ? 'protein' : undefined,
    fat != null ? 'fat' : undefined,
    carbs != null ? 'carbs' : undefined,
  ]).slice(-1)[0];

  return (
    <StyledContainer>
      <StyledNameContainer>
        <StyledName>{name}</StyledName>
        {labels.map(v => (
          <StyledLabel value={v}>
            <StyledLabelText>{v}</StyledLabelText>
          </StyledLabel>
        ))}
      </StyledNameContainer>

      <StyledDescription>
        {description}
        {measurement}
      </StyledDescription>
      <StyledGroup>
        {/*<StyledGroupLabel>Ingredients:</StyledGroupLabel>*/}
        <StyledGroupLabel>Ingredients: </StyledGroupLabel>
        <StyledGroupValue>{ingredients}</StyledGroupValue>
      </StyledGroup>
      <StyledGroup>
        <StyledGroupLabel>Spicy level: </StyledGroupLabel>
        <StyledGroupValue>{spicyLevel}</StyledGroupValue>
      </StyledGroup>
      <StyledGroup>
        <StyledGroupLabel>Allergens: </StyledGroupLabel>
        <StyledGroupValue>{allergens}</StyledGroupValue>
      </StyledGroup>

      {manyProps ? (
        <StyledProps>
          {calories != null && (
            <StyledProp hasBorder={true}>
              <StyledPropLabel>Calories</StyledPropLabel>
              <StyledPropValue>{calories}</StyledPropValue>
            </StyledProp>
          )}
          {protein != null && (
            <StyledProp hasBorder={lastProp !== 'protein'}>
              <StyledPropLabel>Protein</StyledPropLabel>
              <StyledPropValue>{protein} gr</StyledPropValue>
            </StyledProp>
          )}
          {fat != null && (
            <StyledProp hasBorder={lastProp !== 'fat'}>
              <StyledPropLabel>Fat</StyledPropLabel>
              <StyledPropValue>{fat} gr</StyledPropValue>
            </StyledProp>
          )}
          {carbs != null && (
            <StyledProp hasBorder={false}>
              <StyledPropLabel>Carbs</StyledPropLabel>
              <StyledPropValue>{carbs} gr</StyledPropValue>
            </StyledProp>
          )}
        </StyledProps>
      ) : (
        <>
          {calories != null && (
            <StyledGroup noBorder={lastProp === 'calories'}>
              <StyledGroupLabel>Calories: </StyledGroupLabel>
              <StyledGroupValue>{calories} kkal</StyledGroupValue>
            </StyledGroup>
          )}
          {protein != null && (
            <StyledGroup noBorder={lastProp === 'protein'}>
              <StyledGroupLabel>Protein: </StyledGroupLabel>
              <StyledGroupValue>{protein} gr</StyledGroupValue>
            </StyledGroup>
          )}
          {fat != null && (
            <StyledGroup noBorder={lastProp === 'fat'}>
              <StyledGroupLabel>Fat: </StyledGroupLabel>
              <StyledGroupValue>{fat} gr</StyledGroupValue>
            </StyledGroup>
          )}
          {carbs != null && (
            <StyledGroup noBorder={lastProp === 'carbs'}>
              <StyledGroupLabel>Carbs: </StyledGroupLabel>
              <StyledGroupValue>{carbs} gr</StyledGroupValue>
            </StyledGroup>
          )}
        </>
      )}
    </StyledContainer>
  );
};
