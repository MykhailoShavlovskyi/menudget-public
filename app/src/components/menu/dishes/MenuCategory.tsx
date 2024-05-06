import styled from 'styled-components/native';
import {TouchableWithoutFeedback, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';

const StyledText = styled.Text`
  font-size: 13px;
  font-family: 'Avenir';
  border-bottom-color: #ffbd02;
  border-bottom-width: 2px;
  padding-bottom: 4px;
  font-weight: 600;
  letter-spacing: 0.4px;
`;

export const MenuCategory = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: (v: string) => void;
}) => {
  const color = selected ? '#FFBD02' : 'black';
  const borderBottomColor = selected ? 'orange' : 'white';

  const handlePress = useCallback(() => onPress(label), [label, onPress]);

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      hitSlop={{top: 16, bottom: 16, left: 5, right: 5}}>
      <View
        style={{
          borderBottomColor,
          borderBottomWidth: selected ? 2 : 0,
          marginRight: 33,
          paddingBottom: selected ? 0 : 2,
        }}>
        <StyledText style={{color}}>{label}</StyledText>
      </View>
    </TouchableWithoutFeedback>
  );
};
