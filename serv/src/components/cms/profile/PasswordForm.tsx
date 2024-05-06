import React from "react"
import styled from "styled-components"
import { FormikInput } from "../common/formik/FormikInput"
import { Form, FormProps } from "../common/form/Form"
import { object, string, TypeOf } from "zod"
import { Button } from "../common/input/Button"
import {
  getLblConfirmPassword,
  getLblGoBack,
  getLblNewPassword,
  getLblSave,
  getMsgPasswordsNotMatch,
  getHdrProfileSettingsPassword,
} from "../../../messages/profile"

//region Schema

const schema = object({
  password: string().min(6),
  confirmation: string().min(6),
}).refine(
  (data) =>
    data.password.length < 6 || data.confirmation.length < 6 || data.password === data.confirmation,
  () => {
    return {
      message: getMsgPasswordsNotMatch(),
      path: ["error"],
    }
  }
)

export type PasswordFormProps = TypeOf<typeof schema>

//endregion Schema

//region Style

const StyledContainer = styled.div`
  width: 100%;
  background-color: white;
`

const StyledForm = styled(Form)`
  width: 43.05rem;
  padding: 1.875rem 2.125rem;
  box-shadow: unset;
  z-index: 0;

  & > div {
    display: flex;
    gap: 1.25rem;
  }
`

const StyledHeader = styled.h1`
  margin: 0;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 3.125rem;
`

//endregion Style

//region Components

//endregion Components

type Props = Pick<FormProps<typeof schema>, "initialValues" | "onSubmit"> & {
  onGoBack?: () => void
}

export const PasswordForm = ({ initialValues, onGoBack, onSubmit }: Props) => (
  <StyledContainer>
    <StyledForm
      id={"password-form"}
      schema={schema}
      initialValues={initialValues ?? {}}
      onSubmit={onSubmit}
    >
      <StyledHeader>{getHdrProfileSettingsPassword()}</StyledHeader>
      <FormikInput
        id="password-input"
        name="password"
        label={getLblNewPassword()}
        type="password"
      />
      <FormikInput
        id="password-confirmation-input"
        name="confirmation"
        label={getLblConfirmPassword()}
        type="password"
      />
      <div>
        <Button label={getLblGoBack()} onClick={onGoBack} />
        <Button primary={true} type={"submit"} label={getLblSave()} />
      </div>
    </StyledForm>
  </StyledContainer>
)
