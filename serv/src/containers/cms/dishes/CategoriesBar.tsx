import { CategoryPick } from "../../../db/categories/categories"
import styled, { css } from "styled-components"
import { Button } from "../../../components/cms/common/input/Button"
import { PenIcon } from "../../../components/cms/icons/PenIcon"
import { LeftArrowIcon } from "../../../components/cms/icons/LeftArrowIcon"
import { RightArrowIcon } from "../../../components/cms/icons/RightArrowIcon"
import {
  useCategoryId,
  useCategoryScroll,
  useSetCategoryId,
  useSetCategoryScroll,
} from "../../../components/cms/layout/DishesLayout"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { easeOutCubic } from "../../../lib/easing"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMount } from "react-use"

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 1.25rem;
  align-items: center;
  gap: 1.4375rem;
  border-radius: 0.625rem;
  background: #fff;
  margin-bottom: 2.5rem;
  //box-shadow: ${(v) => v.theme.elevation.light};

  button {
    display: flex;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.3125rem;
    justify-content: center;
    align-items: center;

    border-radius: 0.625rem;
    background: #ff9c00;
  }

  svg {
    cursor: pointer;
  }
`

const StyledCategories = styled.div<{
  mounted
}>`
  display: flex;
  align-items: center;
  gap: 1.8125rem;
  flex: 1 0 0;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  ${(v) =>
    !v.mounted &&
    css`
      visibility: hidden;
    `}
`

const StyledCategory = styled.span<{
  selected: boolean
}>`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  cursor: pointer;
  white-space: pre;
  padding: 0.375rem;

  ${(v) =>
    v.selected &&
    css`
      font-weight: 700;
      color: var(--primary-dark-orange, #ff7a00);
      border-bottom: 2px solid #ff7a00;
    `}
`

function scroll(element: HTMLElement, offset: number, onUpdate: () => void, onEnd: () => void) {
  const fromLeft = element.scrollLeft
  const duration = 500

  let start: number
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    const time = easeOutCubic((timestamp - start) / duration) * duration
    const percent = Math.min(time / duration, 1)
    element.scrollTo({ left: fromLeft + offset * percent })
    onUpdate()

    if (time < duration) window.requestAnimationFrame(step)
    else onEnd()
  })
}

export const CategoriesBar = ({
  restaurantId,
  categories,
}: {
  restaurantId?: number
  categories: CategoryPick[]
}) => {
  const categoryId = useCategoryId()
  const categoryScroll = useCategoryScroll()
  const setCategoryId = useSetCategoryId()
  const setCategoryScroll = useSetCategoryScroll()

  // Sort categories
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  )

  // Fallback to first category if no category is selected
  useEffect(() => {
    if (sortedCategories[0] && !sortedCategories.some((v) => v.id === categoryId))
      setCategoryId(sortedCategories[0].id)
  }, [sortedCategories, categoryId])

  // Handle scrolling
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  //
  const handleScrollState = useCallback(() => {
    if (scrollRef.current == null) return

    const scrollMax = scrollRef.current.scrollWidth
    const scroll = scrollRef.current.scrollLeft
    const width = scrollRef.current.clientWidth

    setCanScrollLeft(scroll > 0)
    setCanScrollRight(scroll + width < scrollMax - 0.5)
  }, [scrollRef.current])
  //
  useEffect(() => {
    if (scrollRef.current == null) return
    handleScrollState()
    window.addEventListener("resize", handleScrollState)
    return () => window.removeEventListener("resize", handleScrollState)
  }, [scrollRef.current, handleScrollState])
  //
  useEffect(() => {
    if (scrollRef.current == null) return
    scrollRef.current.scrollTo({ left: categoryScroll })
    handleScrollState()
  }, [categoryScroll])
  //
  const handleScroll = (offset: number) =>
    scrollRef.current &&
    scroll(
      scrollRef.current,
      offset,
      handleScrollState,
      () => scrollRef.current && setCategoryScroll(scrollRef.current.scrollLeft)
    )

  // Handle mount
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  // Handle edit categories
  const router = useRouter()
  const handleEditCategories = () =>
    restaurantId != null && router.push(Routes.CategoriesPage({ restaurantId }).href)

  return (
    <StyledContainer>
      <Button label={<PenIcon />} onClick={handleEditCategories} />
      <LeftArrowIcon
        color={canScrollLeft ? "#161616" : "#8c8c8c"}
        onClick={() => handleScroll(-250)}
      />
      <StyledCategories ref={scrollRef} mounted={mounted}>
        {sortedCategories.map((v) => (
          <StyledCategory
            key={v.id}
            selected={v.id === categoryId}
            onClick={() => setCategoryId(v.id)}
          >
            {v.name}
          </StyledCategory>
        ))}
      </StyledCategories>
      <RightArrowIcon
        color={canScrollRight ? "#161616" : "#8c8c8c"}
        onClick={() => handleScroll(250)}
      />
    </StyledContainer>
  )
}
