import { MoreIcon } from "../icons/MoreIcon"
import React, { ReactElement, ReactNode, useRef, useState } from "react"
import styled from "styled-components"
import { useClickAway } from "react-use"

const StyledContainer = styled.div<{ open: boolean }>`
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: transparent;

  cursor: pointer;
  ${(v) => v.open && `background: rgb(242 237 237)`};

  & > div {
    border: 1px solid #b6b6b6;
    border-radius: 0.625rem;
    width: 17.9375rem;
    top: 2.5rem;
    right: 0;
    position: absolute;
    display: flex;
    z-index: 1;

    flex-direction: column;
    background: white;

    span {
      text-wrap: nowrap;
      display: flex;
      padding: 0.625rem;
      align-items: center;
      gap: 0.9375rem;
      cursor: pointer;

      border-radius: 0.5rem;
      :hover {
        background: #fff2dd;
      }
    }
  }

  .first-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.625rem;

    span {
      color: #828282;
      :hover {
        color: black;
      }
    }
  }

  .second-group {
    border-top: 1px solid #b6b6b6;
    padding: 0.625rem;

    span:hover {
      background: #ffe5e5;
      color: #ff0000;
    }
  }
`
export const ContextMenu = ({
  firstGroup,
  secondGroup,
}: {
  firstGroup: ReactNode
  secondGroup: ReactNode
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useClickAway(ref, () => setOpen(false))

  return (
    <StyledContainer
      ref={ref}
      open={open}
      onClick={(e) => {
        e.stopPropagation()
        setOpen((v) => !v)
      }}
    >
      <MoreIcon />
      {open && (
        <div>
          <div className={"first-group"}>{firstGroup}</div>
          <div className={"second-group"}>{secondGroup}</div>
        </div>
      )}
    </StyledContainer>
  )
}

export const ContextMenuItem = ({
  label,
  Icon,
  overColor,
  onClick,
}: {
  label: string
  Icon: ({ color }: { color: string }) => ReactElement
  overColor: string
  onClick?: () => void
}) => {
  const [over, setOver] = useState(false)

  return (
    <span onPointerOver={() => setOver(true)} onPointerOut={() => setOver(false)} onClick={onClick}>
      <Icon color={over ? overColor : "#828282"} />
      {label}
    </span>
  )
}
