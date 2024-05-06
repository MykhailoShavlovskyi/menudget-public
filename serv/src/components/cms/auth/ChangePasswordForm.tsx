import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Form, FormProps } from "../common/form/Form"
import { ResetPassword } from "../../../db/auth/validations"
import styled, { css } from "styled-components"
import { FormikInput } from "../common/formik/FormikInput"
import { TypeOf } from "zod"
import { Button } from "../common/input/Button"
import {
  getLblConfirmPassword,
  getLblNewPassword,
  getLblSave,
  getMsgPasswordChange,
  getMsgPasswordChangeInfo,
  getMsgPasswordReset,
  getMsgPasswordResetLinkBegin,
  getMsgPasswordResetLinkEnd,
} from "../../../messages/auth"
import { flexCenter, regH3, spacing, stack } from "../layout/CmsLayout"

export type ResetPasswordFormValues = TypeOf<typeof ResetPassword>

type Props = {
  token: string
  isSuccess: boolean
} & Pick<FormProps<typeof ResetPassword>, "onSubmit">

const style = css`
  width: 47.5rem;
  height: 100%;
  padding: ${spacing.s15}rem ${spacing.s8 * 6.5}rem !important;
  gap: ${spacing.s8 * 3.7}rem;
  ${stack};
  ${flexCenter};

  h1 {
    margin: 0 0 ${spacing.s9}rem;
    font-size: 3.125rem;
    font-weight: 800;
    line-height: 3.75rem;
    text-align: center;
  }

  p {
    margin: 0;
    ${regH3};
    color: ${(v) => v.theme.colors.secondary.darkGray};
  }

  h2 {
    margin: 0;
    ${regH3};
    color: ${(v) => v.theme.colors.secondary.darkGray};
  }
`

const StyledForm = styled(Form)`
  ${style};
`

const StyledHeader = styled.header`
  h1 {
    margin: 0;
  }
  width: 100%;
  ${stack};
  gap: ${spacing.s15}rem;
`

const StyledFieldsContainer = styled.div`
  width: 100%;
  ${stack};
  gap: ${spacing.s15}rem;
`

const StyledSuccess = styled.div`
  ${style}
  p {
    text-align: center;
  }

  a {
    width: 100%;
    color: ${(v) => v.theme.colors.primary.orange};
  }
`
// todo localisation
const Header = () => (
  <StyledHeader>
    <h1>{getMsgPasswordChange()}</h1>
    <p>{getMsgPasswordChangeInfo()}</p>
  </StyledHeader>
)

const Fields = () => (
  <StyledFieldsContainer>
    <FormikInput id="password-input" name="password" label={getLblNewPassword()} type="password" />
    <FormikInput
      id="password-confirmation-input"
      name="passwordConfirmation"
      label={getLblConfirmPassword()}
      type="password"
    />
  </StyledFieldsContainer>
)

const Success = () => (
  <StyledSuccess>
    <div>
      <h1>{getMsgPasswordReset()}</h1>
      <p>
        {getMsgPasswordResetLinkBegin()}{" "}
        <Link href={Routes.CmsHomePage()}>{getMsgPasswordResetLinkEnd()}</Link>
      </p>
    </div>
  </StyledSuccess>
)

export const ChangePasswordForm = ({ token, isSuccess, onSubmit }: Props) => {
  return isSuccess ? (
    <Success />
  ) : (
    <StyledForm
      schema={ResetPassword}
      initialValues={{
        password: "",
        passwordConfirmation: "",
        token,
      }}
      onSubmit={onSubmit}
    >
      <Header />
      <Fields />
      <Button type={"submit"} primary={true} label={getLblSave()} />
    </StyledForm>
  )
}
