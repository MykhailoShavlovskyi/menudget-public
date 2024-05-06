import styled from 'styled-components/native';
import React, {useCallback} from 'react';

// Input
const StyledInput = styled.TextInput`
  width: 83.5%;
  padding: 15px 14px 14px 54px;
  margin-right: 24px;

  border-radius: 64px;
  background-color: #f4f4f4;
  color: #b2b2b2;

  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
`;

export const MenuSearchInput = ({
  value,
  onChange,
  onFilterChange,
}: {
  value: string;
  onChange: (v: string) => void;
  onFilterChange: (v: boolean) => void;
}) => {
  const handleChange = useCallback(v => onChange(v.toLowerCase()), [onChange]);

  const handleFocus = useCallback(
    () => onFilterChange(false),
    [onFilterChange],
  );

  return (
    <StyledInput
      onFocus={handleFocus}
      onChangeText={handleChange}
      value={value}
      editable
      maxLength={22}
      placeholder={'Search food'}
      placeholderTextColor={'#b2b2b2'}
    />
  );
};
