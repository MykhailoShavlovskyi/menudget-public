import React from 'react';
import {ImageSlider} from '../../../components/common/slider/ImageSlider';
import {useDishId} from '../../dish/useDishId';
import {compact} from 'lodash';
import ImageSliderRenderItem, {
  StyledPlaceholder,
} from '../../../components/common/slider/ImageSliderRenderItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ImageURISource} from 'react-native';
import {
  useDishImageUrls,
  useDishModelUrl,
  useOrderedDishCount,
} from '../../../store/selectors';

const DishRenderItem = ({
  source,
  itemHeight,
}: {
  source: ImageURISource;
  itemHeight: number;
}) => {
  const route = useRoute();
  const dishId = (route as any).params.dishId;
  const navigation = useNavigation();
  const count = useOrderedDishCount();
  const openAr = () => (navigation as any).navigate('AR', {dishId, count});

  if (source.uri?.includes('.glb')) {
    return (
      <ImageSliderRenderItem
        source={{uri: 'https://picsum.photos/300/200'}}
        itemHeight={itemHeight}
        onPress={openAr}
      />
    );
  } else {
    return <ImageSliderRenderItem source={source} itemHeight={itemHeight} />;
  }
};

export const DishSlider = () => {
  const id = useDishId();
  const imageUrls = useDishImageUrls(id) ?? [];
  const modeUrl = useDishModelUrl(id);

  const sources = compact([...imageUrls, modeUrl]).map(uri => ({uri}));
  if (sources.length === 0) {
    return (
      <StyledPlaceholder
        source={require('../../../../assets/images/placeholder.png')}
      />
    );
  }

  return <ImageSlider data={sources} RenderItem={DishRenderItem} />;
};
