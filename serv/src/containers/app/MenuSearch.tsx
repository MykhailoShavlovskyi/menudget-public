import { MenuSearch as MenuSearchBase } from "../../components/app/menu/MenuSearch"
import { setFilter, setSearch } from "../../store/app/slice"
import React from "react"
import { useMenuFilter, useMenuSearch } from "../../store/app/selectors"

export const MenuSearch = () => (
  <MenuSearchBase
    search={useMenuSearch()}
    filter={useMenuFilter()}
    onFilterChange={setFilter}
    onSearchChange={setSearch}
  />
)
