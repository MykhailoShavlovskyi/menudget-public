import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {Minus} from '../../icons/Minus';
import {Plus} from '../../icons/Plus';

//region Style

const StyledContainer = styled.View`
  margin-top: 2px;
  margin-right: 11px;
  align-items: center;
`;

const StyledCountButton = styled.View`
  background-color: #ffbd02;
  width: 27.5px;
  height: 27.5px;
  justify-content: center;
  align-items: center;
  border-radius: 23px;
`;

const StyledText = styled.Text`
  color: black;
  font-weight: bold;
  font-family: Avenir;
  font-size: 16px;
  font-weight: 900;
  margin: 7px 0;
`;

//endregion Style

//region Components

const AddButton = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}>
    <StyledCountButton>
      <Plus />
    </StyledCountButton>
  </TouchableOpacity>
);

const RemoveButton = ({
  value,
  onPress,
}: {
  value: number;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={value === 1 ? undefined : onPress}
    hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}>
    <StyledCountButton
      style={{backgroundColor: value > 1 ? '#FFBD02' : '#D6D6D6'}}>
      <Minus />
    </StyledCountButton>
  </TouchableOpacity>
);

//endregion Components

export const DishCounter = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const handleIncrease = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);
  const handleDecrease = useCallback(() => {
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <StyledContainer>
      <AddButton onPress={handleIncrease} />
      <StyledText>{value}</StyledText>
      <RemoveButton value={value} onPress={handleDecrease} />
    </StyledContainer>
  );
};
