import React from 'react';
import {Pagination} from 'react-native-snap-carousel';
import {Color} from '../../../lib/Color';

/**
 * Use to get default slider pagination
 * @param dotsLength - length of pagination
 * @param activeDotIndex - index of active slide
 * @param carouselRef - ref for tappableDots - allow tap on dots
 */

export default function ImageSliderPagination({
  dotsLength,
  activeDotIndex,
  carouselRef,
}: {
  dotsLength: number;
  activeDotIndex: number;
  carouselRef: React.MutableRefObject<any>;
}) {
  return (
    <Pagination
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      carouselRef={carouselRef}
      dotsLength={dotsLength}
      activeDotIndex={activeDotIndex}
      tappableDots
      inactiveDotScale={1}
      dotColor={Color.AMBER}
      inactiveDotColor={Color.GAINSBORO}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
      }}
      containerStyle={{
        marginVertical: 12,
        paddingVertical: 6,
      }}
    />
  );
}
