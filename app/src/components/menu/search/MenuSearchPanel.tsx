import styled from 'styled-components/native';
import {MenuSearchInput} from './MenuSearchInput';
import {MenuFilterButton} from './MenuFilterButton';
import React from 'react';
import {Search} from '../../icons/Search';

const StyledContainer = styled.View`
  padding: 23px 16px 0 16px;
`;

const StyledFlex = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledSearchIcon = styled(Search)`
  position: absolute;
  z-index: 5;
  margin-left: 18px;
`;

export const MenuSearchPanel = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: {
  search: string;
  filter: boolean;
  onSearchChange: (v: string) => void;
  onFilterChange: (v: boolean) => void;
}) => (
  <>
    <StyledContainer>
      <StyledFlex>
        <StyledSearchIcon />
        <MenuSearchInput
          value={search}
          onChange={onSearchChange}
          onFilterChange={onFilterChange}
        />
        <MenuFilterButton value={filter} onChange={onFilterChange} />
      </StyledFlex>
    </StyledContainer>
  </>
);
