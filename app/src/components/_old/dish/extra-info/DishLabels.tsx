import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {DishInfoLabel} from './DishInfoLabel';
import {Gluten} from '../../../icons/labels/Gluten';
import {Halal} from '../../../icons/labels/Halal';
import {Kosher} from '../../../icons/labels/Kosher';
import {Lactose} from '../../../icons/labels/Lactose';
import {Pascetarian} from '../../../icons/labels/Pascetarian';
import {Vegan} from '../../../icons/labels/Vegan';
import {Vegetarian} from '../../../icons/labels/Vegetarian';
import {Meat} from '../../../icons/labels/Meat';

const StyledContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;

const StyledItemContainer = styled.View`
  width: 20px;
  height: 20px;
  margin-left: 6px;
`;

export const DishLabels = ({labels}: {labels: string[]}) => {
  const nodes = useMemo(
    () =>
      labels.map(v => {
        switch (v) {
          case 'Meat':
            return (
              <StyledItemContainer key={'meat'}>
                <Meat />
              </StyledItemContainer>
            );
          case 'Halal':
            return (
              <StyledItemContainer key={'halal'}>
                <Halal />
              </StyledItemContainer>
            );
          case 'Gluten':
            return (
              <StyledItemContainer key={'gluten'}>
                <Gluten />
              </StyledItemContainer>
            );
          case 'Kosher':
            return (
              <StyledItemContainer key={'kosher'}>
                <Kosher />
              </StyledItemContainer>
            );
          case 'Lactose':
            return (
              <StyledItemContainer key={'lactose'}>
                <Lactose />
              </StyledItemContainer>
            );
          case 'Pascetarian':
            return (
              <StyledItemContainer key={'pascetarian'}>
                <Pascetarian />
              </StyledItemContainer>
            );
          case 'Vegan':
            return (
              <StyledItemContainer key={'vegan'}>
                <Vegan />
              </StyledItemContainer>
            );
          case 'Vegetarian':
            return (
              <StyledItemContainer key={'vegetarian'}>
                <Vegetarian />
              </StyledItemContainer>
            );
          default:
            return <></>;
        }
      }),
    [labels],
  );

  return nodes.length !== 0 ? (
    <StyledContainer>
      <DishInfoLabel value={'Consists of:'} />
      {nodes}
    </StyledContainer>
  ) : null;
};
