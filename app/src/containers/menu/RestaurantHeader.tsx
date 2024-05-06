import React from 'react';
import {
  RestaurantLogo,
  StyledRestaurantLogoSkeleton,
} from '../../components/menu/header/RestaurantLogo';
import {RestaurantOpeningTime} from '../../components/menu/header/RestaurantOpeningTime';
import {RestaurantDescription} from '../../components/menu/header/RestaurantDescription';
import {RestaurantName} from '../../components/shared/RestaurantName';
import {
  RestaurantBanner as RestaurantBannerBase,
  RestaurantBannerContainer,
  RestaurantBannerPlaceholder,
  StyledRestaurantBannerSkeleton,
} from '../../components/menu/header/RestaurantBanner';
import {RestaurantHeader as RestaurantHeaderBase} from '../../components/menu/header/RestaurantHeader';
import {
  useMenuFetched,
  useRestaurantBannerUrl,
  useRestaurantDescription,
  useRestaurantLogoUrl,
  useRestaurantName,
  useRestaurantTodayCloseTimes,
  useRestaurantTodayOpenTimes,
} from '../../store/selectors';

// Header nodes
const Logo = () => (
  <RestaurantLogo loading={!useMenuFetched()} uri={useRestaurantLogoUrl()} />
);
const Time = () => (
  <RestaurantOpeningTime
    loading={!useMenuFetched()}
    openingTime={useRestaurantTodayOpenTimes()}
    closingTime={useRestaurantTodayCloseTimes()}
  />
);
const Name = () => (
  <RestaurantName loading={!useMenuFetched()} value={useRestaurantName()} />
);
const Description = () => (
  <RestaurantDescription
    loading={!useMenuFetched()}
    value={useRestaurantDescription()}
  />
);

// Restaurant banner
export const RestaurantBanner = () => {
  const uri = useRestaurantBannerUrl();
  const loading = !useMenuFetched();

  if (loading) return <StyledRestaurantBannerSkeleton />;
  return uri ? (
    <RestaurantBannerContainer>
      <RestaurantBannerBase source={{uri}} />
    </RestaurantBannerContainer>
  ) : (
    <RestaurantBannerPlaceholder
      colors={['#FFC500', '#FF8B01']}
      start={{x: 0.288, y: 0.1597}}
      end={{x: 1.32, y: 0.42751}}
    />
  );
};

// Restaurant header
export const RestaurantHeader = () => (
  <RestaurantHeaderBase
    Logo={Logo}
    Time={Time}
    Name={Name}
    Description={Description}
  />
);
