import { useMenuFilter } from "../../store/app/selectors"
import { MenuCategories } from "./MenuCategories"
import { MenuDishes } from "./MenuDishes"
import React from "react"
import { MenuFilters } from "./MenuFilters"

export const MenuContent = () =>
  useMenuFilter() ? (
    <MenuFilters />
  ) : (
    <>
      <MenuCategories />
      <MenuDishes />
    </>
  )
