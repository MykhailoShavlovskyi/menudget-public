import { Bookmarks as BookmarksBase } from "../../components/app/Bookmarks"
import {
  useBookmarks,
  useDishName,
  useDishPrice,
  useDishThumbnailUrl,
  useNoBookmarks,
  useRestaurantName,
} from "../../store/app/selectors"
import { DishEntry, StyledSplitter } from "../../components/app/shared/DishEntry"
import { removeBookmark, setSelectedDish } from "../../store/app/slice"
import React from "react"

const Item = ({ id, last }: { id: number; last: boolean }) => (
  <>
    <DishEntry
      thumbnailUrl={useDishThumbnailUrl(id)}
      name={useDishName(id) ?? ""}
      price={useDishPrice(id) ?? 0}
      onClick={() => setSelectedDish(id)}
      onDelete={() => removeBookmark(id)}
    />
    {!last && <StyledSplitter />}
  </>
)

const Items = () => {
  const bookmarks = useBookmarks()
  return (
    <>
      {bookmarks.map((v, i) => (
        <Item key={v} id={v} last={i === bookmarks.length - 1} />
      ))}
    </>
  )
}

export const Bookmarks = () => (
  <BookmarksBase
    restaurantName={useRestaurantName()}
    bookmarks={<Items />}
    noBookmarks={useNoBookmarks()}
  />
)
