import React from 'react';
import styled from 'styled-components/native';
import {ImageURISource, TouchableOpacity} from 'react-native';

const StyledImage = styled.Image<{height: number}>`
  resize-mode: cover;
  flex: 1;
  margin: 0 16px;
  border-radius: 32px;
`;

const StyledImageWrp = styled.View<{height: number}>`
  width: 100%;
  height: ${(p: any) => p.height}px;
`;

export const StyledPlaceholder = styled.Image`
  width: 100%;
  height: 300px;
`;

/**
 * Use to get default slider pagination
 * @param item - link to image
 * @param itemHeight - height of item
 */

export const ImageSliderRenderItem = ({
  source,
  itemHeight,
  onPress,
}: {
  source: ImageURISource;
  itemHeight: number;
  onPress?: () => void;
}) => {
  const element = (
    <StyledImageWrp height={itemHeight} onPress={onPress}>
      <StyledImage source={source} />
    </StyledImageWrp>
  );
  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{element}</TouchableOpacity>;
  }
  return element;
};

export default ImageSliderRenderItem;
