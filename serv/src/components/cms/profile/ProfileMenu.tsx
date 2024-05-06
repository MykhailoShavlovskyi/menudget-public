import styled, { css } from "styled-components"
import { GearIcon } from "../icons/GearIcon"
import { ChatIcon } from "../icons/ChatIcon"
import { LogoutIcon } from "../icons/LogoutIcon"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Modal } from "../common/modal/Modal"
import React, { useState } from "react"
import { Button } from "../common/input/Button"
import {
  getLblCancel,
  getHdrLogOut,
  getLblYes,
  getMsgHello,
  getMsgLogOut,
  getMsgSettings,
  getMsgSupportChat,
} from "../../../messages/profile"

const select = css`
  border-left: 3px solid #828282;
  background: #f5f5f5;

  svg {
    margin-left: -3px;
  }
`

const StyledContainer = styled.aside`
  display: flex;
  height: calc(100vh - 6.34rem);
  padding: 2.5rem 0;
  flex-direction: column;

  background: white;
  //  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  border-right: 2px solid #d0d0d0;
  z-index: 1;

  h1 {
    margin: 0 2.125rem 2.5rem;

    color: #ff7a00;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 2.375rem;
  }

  ul {
    display: grid;
    gap: 1.875rem;
    padding: 0;
  }
`

const StyledItem = styled.li<{
  selected?: boolean
}>`
  display: flex;
  padding: 0.625rem 2.125rem;
  align-items: center;
  gap: 0.875rem;
  box-sizing: content-box;

  font-feature-settings: "calt" off, "liga" off;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.875rem;
  cursor: pointer;

  :hover {
    ${select}
  }

  ${(v) => v.selected && select}
`

const StyledModalFooter = styled.div``

export type ProfileMenuProps = {
  page: "settings" | "support"
  userName: string
  onLogout: () => void
}

export const ProfileMenu = ({ page, userName, onLogout }: ProfileMenuProps) => {
  const [loggingOut, setLoggingOut] = useState(false)

  return (
    <>
      <StyledContainer>
        <h1>{getMsgHello(userName)}</h1>
        <ul>
          <Link href={Routes.SettingsPage().href}>
            <StyledItem selected={page === "settings"}>
              <GearIcon />
              {getMsgSettings()}
            </StyledItem>
          </Link>

          <Link href={Routes.SupportPage().href}>
            <StyledItem selected={page === "support"}>
              <ChatIcon />
              {getMsgSupportChat()}
            </StyledItem>
          </Link>

          <StyledItem onClick={() => setLoggingOut(true)}>
            <LogoutIcon />
            {getMsgLogOut()}
          </StyledItem>
        </ul>
      </StyledContainer>
      <Modal
        isOpen={loggingOut}
        header={getHdrLogOut()}
        footer={
          <>
            <Button id={"cancel-btn"} label={getLblCancel()} onClick={() => setLoggingOut(false)} />
            <Button
              id={"logout-btn"}
              primary={true}
              label={getLblYes()}
              onClick={() => {
                console.debug("click")
                onLogout()
              }}
            />
          </>
        }
      />
    </>
  )
}
