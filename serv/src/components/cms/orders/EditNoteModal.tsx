import ReactModal from "react-modal"
import React, { useState } from "react"
import styled from "styled-components"
import { modalContentStyle, modalOverlayStyle } from "../common/modal/Modal"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "../common/input/Button"
import {
  getLblSaveChanges,
  getPlhTypeHere,
  getHdrEditNote,
  getMsgNoteModal,
} from "../../../messages/orders"

const style = {
  overlay: modalOverlayStyle,
  content: {
    ...modalContentStyle,

    width: "31rem",
    height: "22.5rem",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
}

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

const StyledNote = styled.div`
  height: 100%;
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
    flex-grow: 1;
    border: none;
    outline: none;
    color: #161616;
    font-family: Nunito Sans;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
  }
`

const StyledButton = styled(Button)`
  background: #3cb367;
`

export const EditNoteModal = ({
  open,
  initialValue,
  onClose,
  onSave,
}: {
  open: boolean
  initialValue: string
  onClose: () => void
  onSave: (v: string) => void
}) => {
  const [value, setValue] = useState(initialValue)

  return (
    <ReactModal isOpen={open} style={style}>
      <StyledHeader>
        <h2>{getHdrEditNote()}</h2>
        <CrossIcon onClick={onClose} />
      </StyledHeader>
      <StyledNote>
        <h4>{getMsgNoteModal()}</h4>
        <textarea
          placeholder={getPlhTypeHere()}
          maxLength={300}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </StyledNote>
      <StyledButton label={getLblSaveChanges()} onClick={() => onSave(value)} />
    </ReactModal>
  )
}
