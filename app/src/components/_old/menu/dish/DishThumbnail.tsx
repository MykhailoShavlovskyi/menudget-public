import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  align-items: center;
  margin-top: 8px;
`;

type ImageProps = {placeholder?: boolean};

const StyledImage = styled.Image<ImageProps>`
  resize-mode: contain;
  width: ${(p: ImageProps) => (p.placeholder ? '77px' : '85%')};
  height: ${(p: ImageProps) => (p.placeholder ? '77px' : '77px')};
  border-radius: ${(p: ImageProps) => (p.placeholder ? '4px' : '0')};
  opacity: ${(p: ImageProps) => (p.placeholder ? '0.7' : '1')};
`;

export const DishThumbnail = ({uri}: {uri?: string}) => (
  <StyledContainer>
    <StyledImage
      source={
        uri ? {uri} : require('../../../../../assets/images/placeholder.png')
      }
      placeholder={uri == null}
    />
  </StyledContainer>
);
