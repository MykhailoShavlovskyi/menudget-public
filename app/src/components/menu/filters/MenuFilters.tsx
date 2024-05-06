import styled from 'styled-components/native';
import {FiltersButton} from './FiltersButton';
import React, {ReactNode} from 'react';

const StyledContainer = styled.View`
  margin-top: 21px;
  width: 100%;
  padding: 0 31px;
`;

const StyledFlex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const MenuFilters = ({
  filters,
  onReset,
  onSave,
}: {
  filters: ReactNode | ReactNode[];
  onReset: () => void;
  onSave: () => void;
}) => (
  <StyledContainer>
    {filters}
    <StyledFlex>
      <FiltersButton title={'Save'} onPress={onSave} />
      <FiltersButton title={'Reset'} onPress={onReset} />
    </StyledFlex>
  </StyledContainer>
);
