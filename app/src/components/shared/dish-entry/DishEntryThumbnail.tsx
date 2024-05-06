import React from 'react';
import styled from 'styled-components/native';

const StyledImage = styled.Image`
  width: 90px;
  height: 65px;
`;

const StyledPlaceholderContainer = styled.View`
  width: 90px;
  display: flex;
  align-items: center;
`;

const StyledPlaceholderImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
`;

export const DishEntryThumbnail = ({uri}: {uri?: string}) =>
  uri ? (
    <StyledImage style={{resizeMode: 'contain'}} source={{uri}} />
  ) : (
    <StyledPlaceholderContainer>
      <StyledPlaceholderImage
        style={{resizeMode: 'contain'}}
        source={require('../../../../assets/images/placeholder.png')}
      />
    </StyledPlaceholderContainer>
  );
