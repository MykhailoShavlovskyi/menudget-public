import styled from "styled-components"
import { useState } from "react"
import { DownChevronIcon } from "../icons/DownChevronIcon"
import { UpChevronIcon } from "../icons/UpChevronIcon"
import {
  getMsgAnswer1,
  getMsgAnswer2,
  getMsgAnswer3,
  getMsgAnswer4,
  getMsgAnswer5,
  getMsgAnswer6,
  getMsgEmail,
  getMsgPhone,
  getMsgQuestion1,
  getMsgQuestion2,
  getMsgQuestion3,
  getMsgQuestion4,
  getMsgQuestion5,
  getMsgQuestion6,
  getMsgSupport,
  getMsgSupportInfo,
  getMsgSupportInfoDescriptionLine1,
  getMsgSupportInfoDescriptionLine2,
} from "../../../messages/profile"

const StyledContainer = styled.div`
  display: flex;
  padding: 1.875rem 2.125rem;
  flex-direction: column;
  width: 100%;
  background-color: white;
  overflow-y: scroll;

  h1 {
    margin: 0 0 1.88rem;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 3.125rem;
  }

  h2 {
    margin: 0 0 1.25rem;
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 2.375rem;
  }

  .description {
    color: #828282;
    font-size: 1.375rem;
    font-weight: 400;
    line-height: 1.875rem;
  }

  div {
  }
`

const StyledContact = styled.div`
  display: flex;
  gap: 1.875rem;
  margin: 1.875rem 0 3.125rem;

  div {
    padding: 0.9375rem 0rem;

    span:first-child {
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.875rem;
    }

    a {
      color: #ff7a00;
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.875rem;
    }
  }
`

const StyledQuestion = styled.div`
  margin-bottom: 1.25rem;

  div {
    display: flex;
    padding: 0.625rem 0.9375rem;
    height: 3.375rem;
    align-items: center;
    justify-content: space-between;

    border-radius: 0.3125rem;
    background: #f5f5f5;

    cursor: pointer;
    color: #2d2c38;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
  }
`

const Question = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <StyledQuestion>
      <div onClick={() => setOpen(!open)}>
        <span>{question}</span>
        {open ? <UpChevronIcon /> : <DownChevronIcon />}
      </div>
      {open && <p>{answer}</p>}
    </StyledQuestion>
  )
}

export const SupportPanel = () => (
  <StyledContainer>
    <h1>{getMsgSupport()}</h1>
    <h2>{getMsgSupportInfo()}</h2>
    <span className={"description"}>{getMsgSupportInfoDescriptionLine1()}</span>
    <span className={"description"}>{getMsgSupportInfoDescriptionLine2()}</span>

    <StyledContact>
      <div>
        <span>{getMsgEmail()}</span>
        <a href="mailto:info@menudget.com">
          <span>info@menudget.com</span>
        </a>
      </div>
      <div>
        <span>{getMsgPhone()}</span>
        <a href="tel:31683513387">
          <span>+31 683 513 387</span>
        </a>
      </div>
    </StyledContact>

    <h2>Q&A</h2>
    <div>
      <Question question={getMsgQuestion1()} answer={getMsgAnswer1()} />
      <Question question={getMsgQuestion2()} answer={getMsgAnswer2()} />
      <Question question={getMsgQuestion3()} answer={getMsgAnswer3()} />
      <Question question={getMsgQuestion4()} answer={getMsgAnswer4()} />
      <Question question={getMsgQuestion5()} answer={getMsgAnswer5()} />
      <Question question={getMsgQuestion6()} answer={getMsgAnswer6()} />
    </div>
  </StyledContainer>
)
