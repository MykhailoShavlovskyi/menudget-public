import React from 'react';
import styled from 'styled-components/native';
import {Splitter} from '../../common/Splitter';
import {
  StyledDishDescriptionText,
  StyledDishNameText,
  StyledDishMeasurementText,
} from '../../shared/DishInfo';

const StyledContainer = styled.View`
  margin-top: 13px;
  font-weight: 500;

  padding: 0 34px;
`;

const StyledContainer2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: 0;
`;

const StyledTextContainer = styled.View`
  width: 75%;
`;

const StyledDescriptionText = styled.Text`
  margin-top: 8px;
  color: #b2b2b2;
  font-family: Avenir;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 13px;
`;

const StyledSplitter = styled(Splitter)`
  margin-top: 17px;
  margin-bottom: 26px;
`;

export const DishInfo = ({
  measurement,
  name,
  description,

  Counter,
  ExtraInfo,
}: {
  measurement: string;
  name: string;
  description: string;

  Counter: () => JSX.Element;
  ExtraInfo: () => JSX.Element;
}) => (
  <StyledContainer>
    <StyledDishMeasurementText>{measurement}</StyledDishMeasurementText>

    <StyledContainer2>
      <StyledTextContainer>
        <StyledDishNameText>{name}</StyledDishNameText>
        <StyledDescriptionText numberOfLines={3}>
          {description}
        </StyledDescriptionText>
      </StyledTextContainer>
      <Counter />
    </StyledContainer2>

    <StyledSplitter />
    <ExtraInfo />
  </StyledContainer>
);
