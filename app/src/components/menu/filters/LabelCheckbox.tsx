import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  background-color: #ffbd02;
  padding: 6px 31px;
  border-radius: 48px;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: white;
  font-family: Avenir;
  font-weight: 500;
  font-size: 14px;
`;

export const LabelCheckbox = ({
  label,
  selected,
  onAdd,
  onRemove,
  ...rest
}: {
  label: string;
  selected: boolean;
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
}) => {
  const handlePress = useCallback(
    () => (selected ? onRemove(label) : onAdd(label)),
    [onAdd, onRemove, selected, label],
  );

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      <StyledContainer
        style={{backgroundColor: selected ? '#FFBD02' : '#F4F4F4'}}>
        <StyledText style={{color: selected ? 'white' : '#B2B2B2'}}>
          {label}
        </StyledText>
      </StyledContainer>
    </TouchableOpacity>
  );
};
