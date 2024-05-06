import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

//height: 238px;
export const RestaurantBanner = styled.Image`
  height: 190px;
  width: 100%;
  resize-mode: cover;
`;

export const RestaurantBannerContainer = styled.View`
  background-color: #e3e3e3;
`;

export const RestaurantBannerPlaceholder = styled(LinearGradient)`
  height: 190px;
  width: 100%;
  resize-mode: cover;
`;

export const StyledRestaurantBannerSkeleton = styled.View`
  height: 190px;
  width: 100%;
  background-color: #e3e3e3;
`;
