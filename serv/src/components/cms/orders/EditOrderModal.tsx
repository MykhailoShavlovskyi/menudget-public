import ReactModal from "react-modal"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { modalContentStyle, modalOverlayStyle } from "../common/modal/Modal"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "../common/input/Button"
import { SSelect } from "../common/input/Select"
import { Form } from "../common/form/Form"
import { array, number, object, string } from "zod"
import { id } from "../../../db/validation"
import { noop } from "lodash"
import {
  getHeaEditReceipt,
  getLblAdd,
  getLblReceiptSaveChanges,
  getPlhReceiptTypeHere,
} from "../../../messages/orders"
import { currencies } from "../../../lib/currencies"

const style = {
  overlay: modalOverlayStyle,
  content: {
    ...modalContentStyle,
    background: "white",

    width: "31rem",
    height: "fin-content",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
}

const StyledForm = styled(Form)`
  box-shadow: unset;
  border: none;
`

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 0.62rem;

  h2 {
    margin-top: 1.05rem;
    margin-bottom: 0;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;

    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    text-align: center;
    pointer-events: none;
  }

  svg {
    cursor: pointer;
  }
`

const StyledList = styled.ul`
  padding: 1.225rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.625rem;

  li {
    display: flex;
    align-items: center;

    text-indent: 0;
    list-style-type: none;
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.875rem;

    span:nth-child(1) {
      flex-grow: 1;
    }

    button {
      border-radius: 1rem;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ff7a00;
      font-size: 1.5rem;
      border: none;
      margin: 0 0.375rem;
      cursor: pointer;
      text-align: center;
      :disabled {
        color: gray;
        opacity: 0.5;
      }
    }

    span:nth-child(3) {
      color: #ff7a00;
    }
    span:nth-child(5) {
      width: 5.625rem;
      text-align: end;
    }
  }
`

const StyledAddDish = styled.div`
  display: flex;
  padding: 0.625rem;
  gap: 0.625rem;

  & > button {
    flex: 1 1 30%;
  }

  & > div {
    flex: 2 1 70%;
  }
`

const StyledNote = styled.div`
  margin-bottom: 1.88rem;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;

  border-radius: 0.625rem;
  border: 1px solid #ff7a00;
  background: #fff;

  h4 {
    margin: 0;
    color: #ff9c00;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.375rem;
  }

  textarea {
    min-height: 2rem;
    max-height: 15rem;
    min-width: 100%;
    max-width: 100%;
    border: none;
    outline: none;
    color: #161616;
    font-family: Nunito Sans;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
    height: 4rem;
  }
`

const StyledButton = styled(Button)`
  background: #3cb367;
`

const validation = object({
  notes: string().max(300),
  dishes: array(
    object({
      id,
      name: string().max(30),
      count: number().int().min(1),
    })
  ),
})

export const EditOrderModal = ({
  open,
  notes,
  currency = "usd",
  dishes,
  allDishes,
  onClose,
  onSave,
}: {
  open: boolean
  notes: string
  currency?: string
  dishes: { id: number; name: string; count: number; price: number }[]
  allDishes: { id: number; name: string; price: number }[]
  onClose: () => void
  onSave: (dishes: { id: number; count: number }[], notes: string) => void
}) => {
  const [selectValue, setSelectValue] = useState<any>(undefined)
  const [dishesState, setDishesState] = useState(dishes)
  useEffect(() => {
    dishesState.length === 0 && dishes.length !== 0 && setDishesState(dishes)
  }, [dishes])
  const sortedDishes = dishesState.sort((a, b) => {
    if (a.price !== b.price) {
      return b.price - a.price
    } else return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  })

  const options = useMemo(() => allDishes.map((v) => ({ value: v.id, label: v.name })), [allDishes])

  const handleAddDish = useCallback(() => {
    if (selectValue == null) return
    const existing = dishesState.find((v) => v.id === selectValue[0])
    if (existing)
      setDishesState([
        ...dishesState.filter((v) => v.id !== selectValue[0]),
        { ...existing, count: existing.count + 1 },
      ])
    else {
      const added = allDishes.find((v) => v.id === selectValue[0])
      if (added) setDishesState([...dishesState, { ...added, count: 1 }])
    }
  }, [allDishes, dishesState, selectValue])

  const handleAddOneMoreDish = useCallback(
    (id: number) => {
      const existing = dishesState.find((v) => v.id === id)

      if (existing)
        setDishesState([
          ...dishesState.filter((v) => v.id !== id),
          { ...existing, count: existing.count + 1 },
        ])
    },
    [dishesState]
  )

  const handleRemoveDish = useCallback(
    (id: number) => {
      const existing = dishesState.find((v) => v.id === id)
      if (existing) {
        if (existing.count > 1)
          setDishesState([
            ...dishesState.filter((v) => v.id !== id),
            { ...existing, count: existing.count - 1 },
          ])
        else {
          setDishesState(dishesState.filter((v) => v.id !== id))
        }
      }
    },
    [dishesState]
  )

  const [currentNotes, setNotes] = useState(notes)
  useEffect(() => {
    notes && setNotes(notes)
  }, [notes])

  const handleSubmit = useCallback(async () => {
    dishesState && onSave(dishesState, currentNotes)
  }, [dishesState, currentNotes])

  return (
    <ReactModal isOpen={open} style={style}>
      <>
        <StyledHeader>
          <h2>{getHeaEditReceipt()}</h2>
          <CrossIcon onClick={onClose} />
        </StyledHeader>

        <StyledForm
          id={"restaurant-form"}
          schema={validation}
          initialValues={{ notes, dishes }}
          onSubmit={handleSubmit}
        >
          <>
            <StyledList>
              {sortedDishes.map((v, i) => (
                <li key={v.name}>
                  <span>
                    {i + 1}. {v.name}
                  </span>
                  <button type={"button"} onClick={() => handleRemoveDish(v.id)}>
                    -
                  </button>
                  <span>{v.count}</span>
                  <button type={"button"} onClick={() => handleAddOneMoreDish(v.id)}>
                    +
                  </button>
                  <span>
                    {v.price * v.count}
                    {currencies[currency] ?? "$"}
                  </span>
                </li>
              ))}
            </StyledList>

            <StyledAddDish>
              <SSelect
                id={"dish-input"}
                searchable={true}
                options={options}
                placeholder={selectValue}
                value={selectValue as any}
                onChange={(v) => setSelectValue(v)}
              />
              <Button
                label={getLblAdd()}
                type={"button"}
                disabled={selectValue == null}
                onClick={handleAddDish}
              />
            </StyledAddDish>

            <StyledNote>
              <h4>Note</h4>
              <textarea
                placeholder={getPlhReceiptTypeHere()}
                maxLength={300}
                value={currentNotes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </StyledNote>
            <StyledButton label={getLblReceiptSaveChanges()} type={"submit"} />
          </>
        </StyledForm>
      </>
    </ReactModal>
  )
}
