import { createContext, PropsWithChildren, useContext, useState } from "react"
import { BlitzLayout } from "@blitzjs/next"
import CmsLayout from "./CmsLayout"

const CategoryContext = createContext<{
  categoryId: number
  categoryScroll: number
  setCategoryId: (v: number) => void
  setCategoryScroll: (v: number) => void
}>({
  categoryId: -1,
  categoryScroll: 0,
  setCategoryId: () => {},
  setCategoryScroll: () => {},
})

export const useCategoryId = () => useContext(CategoryContext).categoryId
export const useCategoryScroll = () => useContext(CategoryContext).categoryScroll
export const useSetCategoryId = () => useContext(CategoryContext).setCategoryId
export const useSetCategoryScroll = () => useContext(CategoryContext).setCategoryScroll

export const DishesLayout: BlitzLayout<PropsWithChildren<{}>> = ({
  children,
}: PropsWithChildren) => {
  const [categoryId, setCategoryId] = useState(-1)
  const [categoryScroll, setCategoryScroll] = useState(0)

  return (
    <CmsLayout>
      <CategoryContext.Provider
        value={{ categoryId, categoryScroll, setCategoryId, setCategoryScroll }}
      >
        {children}
      </CategoryContext.Provider>
    </CmsLayout>
  )
}
