import { StyledLabel } from "../common/Label"
import styled from "styled-components"
import { Checkbox } from "../common/input/Checkbox"
import { ChangeEvent, useEffect, useState } from "react"
import { useField } from "formik"
import { getHour, getMinute } from "../../../lib/time"
import {
  getLblPasteSameTime,
  getLblWorkingHours,
  getMsgFriday,
  getMsgMonday,
  getMsgSaturday,
  getMsgSunday,
  getMsgThursday,
  getMsgTuesday,
  getMsgWednesday,
  getTypFrom,
  getTypTo,
} from "../../../messages/restaurants"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.375rem;
`

const StyledDay = styled.div`
  display: flex;

  gap: 2.875rem;

  & > span:first-child {
    width: 3rem;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.375rem;
  }
`

const StyledTimeInput = styled.div`
  display: flex;

  span {
    :first-child {
      margin-right: 0.9375rem;
    }

    :nth-child(3) {
      margin: 0 0.25rem;
    }
  }

  input {
    display: flex;
    width: 2.75rem;
    min-width: 2.75rem;
    padding: 0 0.375rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;

    border-radius: 0.375rem;
    background: #f5f5f5;
    border: none;
    outline: none;
    font-family: Nunito Sans;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
    text-align: center;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`

const TimeInput = ({
  type,
  value,
  onChange,
}: {
  type: string
  value: number
  onChange: (v: number) => void
}) => {
  const [hour, setHour] = useState(getHour(value))
  const [minute, setMinute] = useState(getMinute(value))
  useEffect(() => {
    setHour(getHour(value))
    setMinute(getMinute(value))
  }, [value])

  const getString = (e: ChangeEvent<HTMLInputElement>, max: number) => {
    const n1 = e.target.value[0] ? Number(e.target.value[0] ?? "") : NaN
    const n2 = e.target.value[1] ? Number(e.target.value[1] ?? "") : NaN

    const int = parseInt(e.target.value)
    if (int < 0) return "00"
    if (int > max) return max.toString()
    return (n1.toString() + (isNaN(n2) ? "" : n2.toString())).toString()
  }

  return (
    <StyledTimeInput>
      <span>{type}</span>
      <input
        type={"number"}
        min={0}
        max={23}
        value={hour}
        placeholder={"00"}
        onChange={(e) => {
          setHour(getString(e, 23))
        }}
        onBlur={() => {
          const h = hour === "NaN" ? 0 : parseInt(hour)
          setHour(getHour(h))
          onChange(h + parseInt(minute) / 60)
        }}
      />
      <span>:</span>
      <input
        type={"number"}
        min={0}
        max={59}
        value={minute}
        placeholder={"00"}
        onChange={(e) => {
          setMinute(getString(e, 59))
        }}
        onBlur={() => {
          const m = minute === "NaN" ? 0 : parseInt(minute)
          setMinute(getMinute(m / 60))
          onChange(parseInt(hour) + m / 60)
        }}
      />
    </StyledTimeInput>
  )
}

export const WorkingTime = () => {
  const [pasteSameTime, setPasteSameTime] = useState(false)

  const [openField, _, openHelpers] = useField("openTimes")
  const [closeField, __, closeHelpers] = useField("closeTimes")

  return (
    <StyledContainer>
      <StyledLabel>{getLblWorkingHours()}</StyledLabel>
      <StyledDay>
        <span>{getMsgMonday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[0]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[0] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[0]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[0] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <StyledDay>
        <span>{getMsgTuesday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[1]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[1] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[1]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[1] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <StyledDay>
        <span>{getMsgWednesday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[2]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[2] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[2]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[2] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <StyledDay>
        <span>{getMsgThursday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[3]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[3] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[3]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[3] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <StyledDay>
        <span>{getMsgFriday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[4]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[4] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[4]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[4] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <StyledDay>
        <span>{getMsgSaturday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[5]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[5] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[5]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[5] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <StyledDay>
        <span>{getMsgSunday()}</span>
        <TimeInput
          type={getTypFrom()}
          value={openField.value[6]}
          onChange={(v) => {
            if (pasteSameTime) openField.value = [v, v, v, v, v, v, v]
            else openField.value[6] = v
            openHelpers.setValue(openField.value)
          }}
        />
        <TimeInput
          type={getTypTo()}
          value={closeField.value[6]}
          onChange={(v) => {
            if (pasteSameTime) closeField.value = [v, v, v, v, v, v, v]
            else closeField.value[6] = v
            closeHelpers.setValue(closeField.value)
          }}
        />
      </StyledDay>
      <Checkbox
        label={getLblPasteSameTime()}
        checked={pasteSameTime}
        onChange={() => setPasteSameTime(!pasteSameTime)}
      />
    </StyledContainer>
  )
}
