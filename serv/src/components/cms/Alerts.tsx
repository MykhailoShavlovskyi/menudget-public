import styled, { css } from "styled-components"
import { useState } from "react"
import { useEvent, useMount } from "react-use"
import { v4 as uuid } from "uuid"

const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  pointer-events: none;
`

const StyledAlert = styled.div<{
  active: boolean
}>`
  display: flex;
  padding: 0.5rem 2rem;
  background-color: white;
  width: fit-content;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px 0 #d4c4c2;
  margin-bottom: -3rem;
  transition: margin-bottom 0.3s ease-in;
  border-radius: 0.5rem;

  ${(v) =>
    v.active &&
    css`
      margin-bottom: 1rem;
    `}
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
  }
`

const Check = () => (
  <svg
    height="14px"
    width="14px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17.837 17.837"
  >
    <g>
      <path
        fill={"#419814"}
        d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"
      />
    </g>
  </svg>
)

const Alert = ({ value, onDestroy }: { value: string; onDestroy: () => void }) => {
  const [active, setActive] = useState(false)

  useMount(() => {
    setTimeout(() => {
      setActive(true)
      setTimeout(() => {
        setActive(false)
        setTimeout(onDestroy, 300)
      }, 2500)
    }, 50)
  })

  return (
    <StyledAlert active={active}>
      <div>
        <Check />
      </div>
      {value}
    </StyledAlert>
  )
}

export const Alerts = () => {
  const [alerts, setAlerts] = useState<
    {
      message: string
      id: string
    }[]
  >([])

  useEvent(
    "alert-added",
    (e: CustomEvent) => setAlerts([...alerts, { message: e.detail, id: uuid() }]),
    document
  )

  useEvent("alert-removed", () => setAlerts(alerts.filter((v) => v !== alerts[0])), document)

  return (
    <StyledContainer>
      {alerts[0] && <Alert key={alerts[0].id} value={alerts[0].message} onDestroy={removeAlert} />}
    </StyledContainer>
  )
}

export function addAlert(message: string) {
  document.dispatchEvent(new CustomEvent("alert-added", { detail: message }))
}

function removeAlert() {
  document.dispatchEvent(new Event("alert-removed"))
}

export default Alerts
