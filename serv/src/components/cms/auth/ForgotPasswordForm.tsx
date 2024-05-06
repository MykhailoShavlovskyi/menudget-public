import { Form, FormProps } from "../common/form/Form"
import { ForgotPassword } from "../../../db/auth/validations"
import { FormikInput } from "../common/formik/FormikInput"
import styled, { css } from "styled-components"
import { TypeOf } from "zod"
import { Button } from "../common/input/Button"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import {
  getLblBackToLogin,
  getLblEmail,
  getLblSend,
  getMsgForgotPassword,
  getMsgForgotPasswordInfo,
  getMsgRequestSubmitted,
  getMsgRequestSubmittedInfo,
  getPlhEmail,
} from "../../../messages/auth"

export type ForgotPasswordFormValues = TypeOf<typeof ForgotPassword>

type Props = {
  isSuccess: boolean
} & Pick<FormProps<typeof ForgotPassword>, "onSubmit">

const style = css`
  display: flex;
  flex-direction: column;
  width: 47.5rem;
  height: 100%;
  padding: 1.875rem 6.5rem;
  justify-content: center;
  align-items: center;
  gap: 3.7rem;

  h1 {
    margin: 0 0 1.25rem;
    font-size: 3.125rem;
    font-weight: 800;
    line-height: 3.75rem;
    text-align: center;
  }

  p {
    color: #828282;
    font-size: 1.625rem;
    font-weight: 400;
    line-height: 2.125rem;
    margin: 0;
  }

  h2 {
    color: #828282;
    font-size: 1.625rem;
    font-weight: 400;
    line-height: 2.125rem;
    margin: 0;
  }
`

const StyledForm = styled(Form)`
  ${style}
`

const StyledSuccess = styled.div`
  ${style}
  p {
    text-align: center;
  }
  a {
    width: 100%;
  }
`

export const ForgotPasswordForm = ({ isSuccess, onSubmit }: Props) => {
  return isSuccess ? (
    <StyledSuccess id={"request-submitted-message"}>
      <div>
        <h1>{getMsgRequestSubmitted()}</h1>
        <p>{getMsgRequestSubmittedInfo()}</p>
      </div>
      <Link href={Routes.LoginPage().href}>
        <Button primary={true} label={getLblBackToLogin()} />
      </Link>
    </StyledSuccess>
  ) : (
    <StyledForm schema={ForgotPassword} initialValues={{ email: "" }} onSubmit={onSubmit}>
      <div>
        <h1>{getMsgForgotPassword()}</h1>
        <p>{getMsgForgotPasswordInfo()}</p>
      </div>
      <FormikInput
        id="email-input"
        name="email"
        label={getLblEmail()}
        placeholder={getPlhEmail()}
      />
      <Button type={"submit"} primary={true} label={getLblSend()} />
    </StyledForm>
  )
}
