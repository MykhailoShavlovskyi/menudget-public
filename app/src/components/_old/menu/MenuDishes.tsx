import styled from 'styled-components/native';
import React, {ReactNode, useMemo} from 'react';
import {NoContent} from '../../common/NoContent';
import {StyledDishCardSkeleton} from './dish/DishCard';

const StyledContainer = styled.View`
  flex-direction: row;
  padding: 0 16px;
`;

/*const StyledScrollView = styled(GestureHandlerScrollView)`
  padding-bottom: 32px;
  overflow: visible;
`;*/

const StyledScrollView = styled.ScrollView`
  padding-bottom: 32px;
  overflow: visible;
`;

export const MenuDishes = ({
  loading,
  category,
  dishes,
}: {
  loading: boolean;
  category: string;
  dishes: ReactNode[];
}) => {
  const hasDishes = useMemo(() => dishes.length !== 0, [dishes.length]);

  return (
    <StyledContainer>
      {hasDishes || loading ? (
        <StyledScrollView
          key={category}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {loading ? (
            <>
              <StyledDishCardSkeleton key={'skeleton-1'} />
              <StyledDishCardSkeleton key={'skeleton-2'} />
            </>
          ) : (
            dishes
          )}
        </StyledScrollView>
      ) : (
        <NoContent message={'No dishes found'} />
      )}
    </StyledContainer>
  );
};
