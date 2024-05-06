import React from 'react';
import styled from 'styled-components/native';

const StyledImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 10px;
`;

export const ReceiptDishThumbnail = ({uri}: {uri?: string}) =>
  uri ? (
    <StyledImage style={{resizeMode: 'contain'}} source={{uri}} />
  ) : (
    <StyledImage
      style={{resizeMode: 'contain'}}
      source={require('../../../assets/images/placeholder.png')}
    />
  );
