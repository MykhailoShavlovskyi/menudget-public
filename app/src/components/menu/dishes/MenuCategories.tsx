import styled from 'styled-components/native';
import {MenuCategory} from './MenuCategory';
import React from 'react';

const StyledContainer = styled.View`
  margin: 16px 16px 16px;
  flex-direction: row;
`;

/*
const StyledScrollView = styled(GestureHandlerScrollView)` // TODO
  overflow: visible;
`;
*/

const StyledScrollView = styled.ScrollView`
  overflow: visible;
`;

const StyledSkeleton1 = styled.View`
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 140px;
  height: 18px;
  margin-right: 24px;
  margin-bottom: 6px;
`;

const StyledSkeleton2 = styled.View`
  background-color: #e3e3e3;
  border-radius: 4px;
  width: 170px;
  height: 18px;
  margin-right: 18px;
  margin-bottom: 6px;
`;

export const MenuCategories = ({
  loading,
  categories,
  selected,
  onChange,
}: {
  loading: boolean;
  categories: string[];
  selected?: string;
  onChange: (v: string) => void;
}) => (
  <StyledContainer>
    <StyledScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}>
      {loading ? (
        <>
          <StyledSkeleton1 key={'skeleton-1'} />
          <StyledSkeleton2 key={'skeleton-2'} />
        </>
      ) : (
        categories.map(c => (
          <MenuCategory
            key={c}
            label={c}
            selected={selected === c}
            onPress={onChange}
          />
        ))
      )}
    </StyledScrollView>
  </StyledContainer>
);
