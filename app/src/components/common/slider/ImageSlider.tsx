import {Dimensions} from 'react-native';
import React, {useRef, useCallback, useState} from 'react';
import Carousel, {CarouselProps} from 'react-native-snap-carousel';

import ImageSliderRenderItem from './ImageSliderRenderItem';
import ImageSliderPagination from './ImageSliderPagination';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

/**
 * Use to get selected dish next photo handler and index
 */

export function useOnSwipeDishPhoto() {
  const [imageIndex, setImageIndex] = useState(0);
  const onSnapToItem = useCallback(
    (index: number) => {
      setImageIndex(index);
    },
    [setImageIndex],
  );
  return {imageIndex, onSnapToItem};
}

interface Props
  extends Partial<Omit<CarouselProps<{uri: string}>, 'renderItem'>> {
  withPagination?: boolean;
  Pagination?: typeof ImageSliderPagination;
  RenderItem?: typeof ImageSliderRenderItem;
}

/**
 * Image Slider
 * @param data - array of links
 * @param sliderWidth - slider width
 * @param itemWidth - width of slider item
 * @param withPagination - allow pagination or not (boolean)
 * @param Pagination -  pagination for slider, DefaultSliderPagination - by default
 */

export function ImageSlider({
  data,
  sliderWidth = SLIDER_WIDTH,
  itemWidth = ITEM_WIDTH,
  itemHeight = ITEM_HEIGHT,
  withPagination = true,
  Pagination = ImageSliderPagination,
  RenderItem = ImageSliderRenderItem,
  ...rest
}: Props) {
  const {imageIndex, onSnapToItem} = useOnSwipeDishPhoto();
  const sliderRef = useRef(null);

  return (
    <>
      <Carousel
        ref={sliderRef}
        onSnapToItem={onSnapToItem}
        renderItem={({item}) => (
          <RenderItem source={item} itemHeight={itemHeight} />
        )}
        data={data ?? []}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        containerCustomStyle={{
          flexGrow: 0,
        }}
        slideStyle={{flexGrow: 0}}
        {...rest}
      />
      {withPagination && (
        <Pagination
          carouselRef={sliderRef}
          dotsLength={data?.length ?? 0}
          activeDotIndex={imageIndex}
        />
      )}
    </>
  );
}
