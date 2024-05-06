import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {DiscountIcon} from '../../../icons/sticker/DiscountIcon';
import {StarIcon} from '../../../icons/sticker/StarIcon';
import {ChefIcon2} from '../../../icons/sticker/ChefIcon2';
import {Sticker} from '../../../../lib/Sticker';
import {View} from 'react-native';

const StyledContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  margin-left: 3px;
  margin-top: -1px;
  color: #b2b2b2;
  font-family: Avenir;
  letter-spacing: 0.2px;
  font-size: 12px;
`;

const StyledDiscountIcon = styled(DiscountIcon)`
  transform: scale(0.5);
  margin-top: -10px;
  margin-right: -6px;
`;
const StyledStarIcon = styled(StarIcon)`
  transform: scale(0.5);
  margin-top: -10px;
  margin-right: -6px;
`;
const StyledChefIcon = styled(ChefIcon2)`
  transform: scale(0.5);
  margin-top: -10px;
  margin-right: -6px;
`;

export const DishHeader = ({
  measurement,
  sticker,
}: {
  measurement?: string;
  sticker: string | null;
}) => {
  const icon = useMemo(() => {
    switch (sticker) {
      case Sticker.Discount:
        return <StyledDiscountIcon />;
      case Sticker.Star:
        return <StyledStarIcon />;
      case Sticker.Chef:
        return <StyledChefIcon />;
      default:
        return null;
    }
  }, [sticker]);

  return (
    <StyledContainer>
      <StyledText>{measurement}</StyledText>
      {icon && <View>{icon}</View>}
    </StyledContainer>
  );
};
