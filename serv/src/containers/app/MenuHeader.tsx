import { MenuHeader as MenuHeaderBase } from "../../components/app/menu/MenuHeader"
import {
  useRestaurantBannerUrl,
  useRestaurantDescription,
  useRestaurantLogoUrl,
  useRestaurantName,
  useRestaurantTodayCloseTimes,
  useRestaurantTodayOpenTimes,
} from "../../store/app/selectors"
import { memo } from "react"

export const MenuHeader = memo(() => (
  <MenuHeaderBase
    bannerUrl={useRestaurantBannerUrl()}
    logoUrl={useRestaurantLogoUrl()}
    openTime={useRestaurantTodayOpenTimes() ?? 0}
    closeTime={useRestaurantTodayCloseTimes() ?? 0}
    name={useRestaurantName()}
    description={useRestaurantDescription()}
  />
))
