import styled, { css } from "styled-components"
import React, { PropsWithChildren } from "react"
import { MenudgetIcon } from "./icons/MenudgetIcon"
import { ProfileIcon } from "./icons/ProfileIcon"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import {
  getMsgDishes,
  getMsgOrders,
  getMsgRestaurant,
  getMsgRestaurants,
  getMsgTables,
  getMsgWaiters,
} from "../../messages/navbar"

export type LinkProps = {
  selected?: boolean
  id?: string
}

const hoverStyle = css`
  transition: transform 100ms ease-in;
  &:hover {
    transform: scale(1.05);
  }
`

export const StyledNavBar = styled.nav`
  display: flex;
  padding: 1.375rem 2.125rem;
  //box-shadow: ${(v) => v.theme.elevation.light};
  border-bottom: 2px solid #d0d0d0;
  z-index: 2;

  .logo-and-links {
    display: flex;
    gap: 1.5rem;
    flex: 1 0 0;

    .logo {
      ${hoverStyle}
    }
  }

  .profile-anchor {
    ${hoverStyle}
  }
`

export const StyledLink = styled.div<LinkProps>`
  display: flex;
  padding: 0.625rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.625rem;

  font-size: 1.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.125rem;
  color: black;

  ${(v) =>
    v.selected &&
    css`
      background: ${(v) => v.theme.colors.secondary.lightOrange};
      color: ${(v) => v.theme.colors.primary.darkOrange};
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      font-weight: 700;
    `}
  &:hover {
    ${(v) =>
      !v.selected &&
      css`
        background: #faf6f1; // TODO theme
      `}
  }

  a {
    text-decoration: none;
  }
`

const StyledProfileContainer = styled.div<{ selected: boolean }>`
  ${(v) =>
    v.selected &&
    css`
      display: flex;
      width: 3.25rem;
      height: 3.25rem;
      align-items: center;
      border-radius: 0.625rem;
      background: #fff2dd;
    `}
`

const restaurantsHref = (restaurantId?: string) =>
  restaurantId != null
    ? `${Routes.RestaurantsPage().pathname}/${restaurantId}`
    : Routes.RestaurantsPage().pathname

const dishesHref = (restaurantId?: string) =>
  restaurantId != null
    ? `${Routes.DishesPage().pathname}/${restaurantId}`
    : Routes.DishesPage().pathname

const ordersHref = (restaurantId?: string) =>
  restaurantId != null
    ? `${Routes.OrdersPage().pathname}/${restaurantId}`
    : Routes.OrdersPage().pathname

const tablesHref = (restaurantId?: string) =>
  restaurantId != null
    ? `${Routes.TablesPage().pathname}/${restaurantId}`
    : Routes.TablesPage().pathname

const waitersHref = (restaurantId?: string) =>
  restaurantId != null
    ? `${Routes.WaitersPage().pathname}/${restaurantId}`
    : Routes.WaitersPage().pathname

const promosHref = (restaurantId?: string) =>
  restaurantId != null
    ? `${Routes.PromosPage().pathname}/${restaurantId}`
    : Routes.PromosPage().pathname

export const NavBar = ({
  settingsOpen,
  children,
}: PropsWithChildren<{ settingsOpen: boolean }>) => (
  <StyledNavBar>
    <div className={"logo-and-links"}>
      <a href={"/cms"} className={"logo"}>
        <MenudgetIcon />
      </a>
      {children}
    </div>
    <a href={"/cms/profile"} className={"profile-anchor"}>
      <StyledProfileContainer selected={settingsOpen}>
        <ProfileIcon color={settingsOpen ? "#FF7A00" : "#828282"} />
      </StyledProfileContainer>
    </a>
  </StyledNavBar>
)

export const RestaurantsLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={restaurantsHref()}>{getMsgRestaurants()}</Link>
  </StyledLink>
)

export const RestaurantLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={restaurantsHref(props.id)}>{getMsgRestaurant()}</Link>
  </StyledLink>
)

export const DishesLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={dishesHref(props.id)}>{getMsgDishes()}</Link>
  </StyledLink>
)

export const OrdersLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={ordersHref(props.id)}>{getMsgOrders()}</Link>
  </StyledLink>
)

export const TablesLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={tablesHref(props.id)}>{getMsgTables()}</Link>
  </StyledLink>
)

export const WaitersLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={waitersHref(props.id)}>{getMsgWaiters()}</Link>
  </StyledLink>
)

export const PromosLink = (props: LinkProps) => (
  <StyledLink {...props}>
    <Link href={promosHref(props.id)}>Promos</Link>
  </StyledLink>
)
