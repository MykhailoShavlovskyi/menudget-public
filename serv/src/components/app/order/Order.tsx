import styled, { css } from "styled-components"
import React, { ReactNode, useState } from "react"
import { ConfirmOrderModal } from "./ConfirmOrderModal"
import { styledInputMixin } from "../common/AppInput"
import { Button } from "../common/Button"
import { currencies } from "../../../lib/currencies"
import { useEvent } from "react-use"

const StyledBackground = styled.div<{
  open: boolean
}>`
  width: 100%;
  height: 100%;

  position: relative;

  background-color: #ffde81;
  opacity: ${(v) => (v.open ? "0.5" : "0")};
  transition: opacity 0.25s ease-in;
  pointer-events: ${(v) => (v.open ? "all" : "none")};
`

const StyledContainer = styled.div<{
  open: boolean
  offset?: number | null
}>`
  z-index: 1;
  width: 100%;
  height: calc(100% - 7.8rem);
  bottom: 0;
  transition: bottom 0.2s ease-in;
  ${(v) =>
    v.open &&
    css`
      bottom: calc(100% - 7.8rem);
    `}

  ${(v) =>
    v.offset != null &&
    css`
      transition: unset !important;
      bottom: calc(100% - 7.8rem - ${v.offset}px) !important;
    `}

  position: relative;

  border-radius: 2.5rem 2.5rem 0 0;
  box-shadow: 0 0 8px #dddddd;
  background-color: white;
  pointer-events: none;

  & > div:first-child {
    position: absolute;
    width: 100%;
    height: 8rem;
    pointer-events: all;
    z-index: 2;
  }

  & > div:nth-child(2) {
    width: 100%;
    height: 100%;
    padding: 1.75rem 1.75rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    pointer-events: all;

    h2 {
      font-family: Avenir;
      font-size: 1.6rem;
      width: 100%;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }

    p {
      margin-top: 0;
      font-family: Avenir;
      font-weight: lighter;
      color: #b2b2b2;
      font-size: 0.75rem;
      padding: 0 3.5rem 0 3.5rem;
      letter-spacing: 0.3px;
      line-height: 0.8rem;
      text-align: center;
    }

    footer {
      border-top: 1.5px solid #f4f4f4;

      bottom: 0;
      width: calc(100%);
      padding: 2.6rem 0.2rem 2.2rem;
      display: flex;
      align-items: center;
      gap: 1.7rem;

      div {
        height: 100%;
        padding: 1.75rem 1.75rem 0;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 13.5rem;
        box-sizing: border-box;

        span {
          position: absolute;
          color: #ffbd02;
          font-size: 1.6rem;
          font-family: Avenir;
          bottom: 0.65rem;
          letter-spacing: 0.3px;

          &:first-child {
            color: #b2b2b2;
            font-size: 1.3rem;
            font-weight: normal;
            margin-bottom: 2.9rem;
            letter-spacing: 0.3px;
          }
        }
      }

      button {
        width: 33rem;
        height: 3.75rem;
      }
    }
  }
`

const StyledMain = styled.main`
  flex: 1;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  & > div:first-child {
    padding-top: 0.4rem;
    margin-bottom: 1.8rem;
    display: flex;
    flex-direction: column;
  }

  & > div:last-child {
    padding-right: 0.6rem;
    display: grid;
    grid-template-columns: 1fr 2.15fr;
    grid-template-rows: 1fr auto 1fr;

    .large {
      height: 5.8rem;
    }

    label {
      margin-top: 0.9rem;
      margin-left: 0.4rem;
      font-family: Avenir;
      font-weight: bold;
      font-size: 1.3rem;
    }

    input,
    textarea {
      height: 3.4rem;
      max-width: 220px;
      min-width: 220px;
      margin-bottom: 0.7rem;
      ${styledInputMixin}
    }

    textarea {
      min-height: 5rem;
      max-height: 12rem;
    }
  }
`

export const TableInput = ({ value }: { value: string }) => (
  <input placeholder={"Number"} value={value} />
)

export const NotesInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => (
  <textarea
    className={"large"}
    placeholder={"Tell us what do you want else?"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)

export const PromoInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => <input placeholder={"Promo code"} value={value} onChange={(e) => onChange(e.target.value)} />

export const OrderButton = ({ disabled, onOrder }: { disabled?: boolean; onOrder: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button disabled={disabled} onClick={() => setModalOpen(true)}>
        Order
      </Button>
      <ConfirmOrderModal
        open={modalOpen}
        onConfirm={() => {
          onOrder()
          setModalOpen(false)
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  )
}

export const Order = ({
  open,
  currency,
  onClose,
  dishes,
  tableInput,
  notesInput,
  promoInput,
  total,
  orderButton,
}: {
  open: boolean
  currency: string
  onClose: () => void
  dishes: ReactNode
  tableInput: ReactNode
  notesInput: ReactNode
  promoInput: ReactNode
  total: ReactNode
  orderButton: ReactNode
}) => {
  const [down, setDown] = useState(false)
  const [downPos, setDownPos] = useState(0)

  const handleDown = (e) => {
    setDown(true)
    setDownPos(e.clientY)
  }

  const handleMove = (e) => {
    if (!down) return
    const offset = Math.max(e.clientY - downPos, 0)
    const el = document.getElementById("container")
    if (el) {
      el.style.bottom = `calc(100% - 7.8rem - ${offset}px)`
      el.style.transition = "unset"
    }

    if (offset > 380) {
      handleUp()
      onClose()
    }
  }
  useEvent("pointermove", handleMove, document)

  const handleUp = () => {
    setDown(false)
    const el = document.getElementById("container")
    if (el) {
      el.style.bottom = ""
      el.style.transition = ""
    }
  }
  useEvent("pointerup", handleUp, document)

  return (
    <>
      <StyledBackground open={open} onClick={onClose} />
      <StyledContainer id="container" open={open} /*offset={offset}*/>
        <div id="drag-area" onPointerDown={handleDown} />
        <div>
          <h2>Your order</h2>
          <p>
            Bla bla bla so yummy sushi, wow, super sezy pack Bla bla bla so yummy sushi, wow, super
            sezy pack
          </p>
          <StyledMain>
            <div>{dishes}</div>
            <div>
              <label>Table</label>
              {tableInput}
              <label>Notes</label>
              {notesInput}
              <label>Promo</label>
              {promoInput}
            </div>
          </StyledMain>
          <footer>
            <div>
              <span>Total:</span>
              <span>
                {total}
                {currencies[currency] ?? "$"}
              </span>
            </div>
            {orderButton}
          </footer>
        </div>
      </StyledContainer>
    </>
  )
}
