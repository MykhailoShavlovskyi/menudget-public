import {
  Dish as DishBase,
  DishBookmark,
  DishCounter,
  DishFooter,
} from "../../components/app/dish/Dish"
import {
  useDishBookmarked,
  useDishDescription,
  useDishImageUrls,
  useDishImageUrlsCount,
  useDishIngredients,
  useDishLabels,
  useDishMeasurement,
  useDishName,
  useDishOpen,
  useDishPrice,
  useDishSpicyLevel,
  useOrderedDishCount,
  useRestaurantCurrency,
  useRestaurantName,
  useSelectedDishId,
} from "../../store/app/selectors"
import {
  addBookmark,
  orderDish,
  removeBookmark,
  setDishClosed,
  setOrderedDishCount,
  setSelectedDish,
} from "../../store/app/slice"
import ImageGallery from "react-image-gallery"
import { useIsComputer } from "../../lib/useIsComputer"

const Bookmark = () => {
  const id = useSelectedDishId() ?? -1
  const bookmarked = useDishBookmarked(id)

  return (
    <DishBookmark
      enabled={bookmarked}
      onToggle={() => (bookmarked ? removeBookmark(id) : addBookmark(id))}
    />
  )
}

const Gallery = () => {
  const id = useSelectedDishId() ?? -1
  const images = useDishImageUrls(id)

  return (
    <ImageGallery
      items={images?.map((v) => ({ original: v })) ?? []}
      showPlayButton={false}
      showFullscreenButton={false}
      showThumbnails={false}
      showBullets={true}
      showNav={useIsComputer()}
    />
  )
}

const Counter = () => {
  const value = useOrderedDishCount()

  return (
    <DishCounter
      value={value}
      onIncrease={() => setOrderedDishCount(value + 1)}
      onDecrease={() => setOrderedDishCount(value - 1)}
    />
  )
}

const Footer = () => {
  const id = useSelectedDishId() ?? -1
  const price = useDishPrice(useSelectedDishId() ?? -1)
  const count = useOrderedDishCount()
  const currency = useRestaurantCurrency()

  return (
    <DishFooter
      price={(price ?? 0) * count}
      currency={currency}
      onAdd={() => orderDish(id, count)}
    />
  )
}

export const Dish = () => {
  const open = useDishOpen()
  const id = useSelectedDishId() ?? -1

  return (
    <DishBase
      open={open}
      restaurantName={useRestaurantName()}
      noGalleryBullets={(useDishImageUrlsCount(id) ?? 0) < 2}
      measurement={useDishMeasurement(id)}
      name={useDishName(id)}
      description={useDishDescription(id)}
      spicyLevel={useDishSpicyLevel(id)}
      labels={useDishLabels(id)}
      ingredients={useDishIngredients(id)}
      onClose={() => {
        setDishClosed()
        setTimeout(() => setSelectedDish(null), 1000)
      }}
      bookmark={<Bookmark />}
      gallery={<Gallery />}
      counter={<Counter />}
      footer={<Footer />}
    />
  )
}
