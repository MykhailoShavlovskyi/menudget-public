import styled from "styled-components"
import { Modal } from "../common/Modal"
import { Button } from "../common/Button"

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1.2rem 1.1rem 1.1rem;

  font-family: Avenir;

  h2 {
    margin: 0;
    max-width: 65%;
    text-align: center;
    line-height: 1.8rem;
    letter-spacing: -0.8px;

    :nth-child(2) {
      margin-bottom: 0.4rem;
    }
  }

  p {
    text-align: center;
    margin: 0 0 2rem;
    font-size: 0.96rem;
    line-height: 1.37rem;
  }

  div {
    display: flex;
    width: 100%;
    gap: 0.8rem;
  }

  button {
    font-size: 1rem;
    flex: 1;
    padding: 0.5rem 0;

    :nth-child(2) {
      background: none;
      background-color: #d92323 !important;
    }
  }
`

export const ConfirmOrderModal = ({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}) => (
  <StyledModal isOpen={open}>
    <h2>You are about</h2>
    <h2>to make an order</h2>
    <p>
      As soon as you confirm, you order will be send to the kitchen and we will start preparing it,
      this action cannot be cancelled.
    </p>
    <div>
      <Button onClick={onConfirm}>Confirm</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  </StyledModal>
)
