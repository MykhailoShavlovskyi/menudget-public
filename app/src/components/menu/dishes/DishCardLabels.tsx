import styled from 'styled-components/native';
import React from 'react';

const StyledLabel = styled.View<{color: string}>`
  padding: 2px 6px;
  border-radius: 16px;
  margin-right: 6px;
  background-color: ${(v: any) => v.color};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledLabelImage = styled.Image`
  width: 12px;
  height: 12px;
`;

const StyledLabelText = styled.Text`
  margin-left: 4px;
  font-family: Avenir;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
`;

const SpicyLabel = () => (
  <StyledLabel color={'#ffe5e5'}>
    <StyledLabelImage
      source={require('../../../../assets/images/labels/pepper.png')}
    />
    <StyledLabelText>Spicy</StyledLabelText>
  </StyledLabel>
);

const VeganLabel = () => (
  <StyledLabel color={'#e5f7e6'}>
    <StyledLabelImage
      source={require('../../../../assets/images/labels/veg.png')}
    />
    <StyledLabelText>Vegan</StyledLabelText>
  </StyledLabel>
);

const VegetarianLabel = () => (
  <StyledLabel color={'#e5f7e6'}>
    <StyledLabelImage
      source={require('../../../../assets/images/labels/leaf.png')}
    />
    <StyledLabelText>Vegetarian</StyledLabelText>
  </StyledLabel>
);

const AllergensLabel = () => (
  <StyledLabel color={'#fff2dd'}>
    <StyledLabelImage
      source={require('../../../../assets/images/labels/nuts.png')}
    />
    <StyledLabelText>Allergens</StyledLabelText>
  </StyledLabel>
);

const PasceterianLabel = () => (
  <StyledLabel color={'#ffe1ec'}>
    <StyledLabelImage
      source={require('../../../../assets/images/labels/shrimp.png')}
    />
    <StyledLabelText>Pasceterian</StyledLabelText>
  </StyledLabel>
);
