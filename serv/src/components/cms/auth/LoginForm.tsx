import { Login } from "../../../db/auth/validations"
import { Form } from "../common/form/Form"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { TypeOf } from "zod"
import styled from "styled-components"
import { Button } from "../common/input/Button"
import { FormikInput } from "../common/formik/FormikInput"
import { FacebookIcon } from "../icons/FacebookIcon"
import { GoogleIcon } from "../icons/GoogleIcon"
import { AppleIcon } from "../icons/AppleIcon"
import {
  getLblLogin,
  getLblLoginEmail,
  getLblLoginPassword,
  getLblRememberMe,
  getMsgAgree,
  getMsgLoginForgotPassword,
  getMsgLoginOr,
  getMsgPrivacyPolicy,
  getMsgSocialMedia,
  getMsgWelcome,
  getMsgWelcomeInfo,
  getPlhLoginEmail,
  getPlhLoginPassword,
} from "../../../messages/auth"
import { FormikCheckBox } from "../common/formik/FormikCheckbox"

const StyledForm = styled(Form)`
  width: 47.5rem;
  height: 100%;
  padding: 6.5rem 6.5rem 3rem;
  gap: 0;

  h1 {
    margin: 0 0 1.25rem;
    font-size: 3.125rem;
    font-weight: 800;
    line-height: 3.75rem;
  }

  h1 ~ p {
    color: #828282;
    font-size: 1.625rem;
    font-weight: 400;
    line-height: 2.125rem;
    margin: 0 0 3.75rem;
  }

  .options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.75rem;

    a {
      color: #828282;
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
  }

  button {
    margin-bottom: 1.875rem;
  }

  button ~ div {
    p {
      display: inline;
      color: #828282;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.25rem;
    }

    a {
      color: #ff7a00;
    }
  }

  .or {
    display: flex;
    align-items: center;
    gap: 1.6875rem;

    div {
      flex: 1;
      height: 0.125rem;
      background: #f5f5f5;
    }

    h2 {
      margin: 1.25rem 0;
      color: #828282;
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 1.875rem;
    }
  }

  h3 {
    color: #828282;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
    margin: 0 0 1.875rem;
  }

  .social {
    display: flex;
    justify-content: center;
    gap: 5.625rem;
  }
`

const StyledMargin = styled.div`
  margin-bottom: 2.5rem;
`

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (values: TypeOf<typeof Login>) => Promise<void | {
    FORM_ERROR: string
  }>
}) => (
  <StyledForm
    schema={Login}
    initialValues={{ email: "", password: "", remember: false }}
    onSubmit={onSubmit}
  >
    <h1>{getMsgWelcome()}</h1>
    <p>{getMsgWelcomeInfo()}</p>

    <FormikInput
      id="email-input"
      name="email"
      label={getLblLoginEmail()}
      placeholder={getPlhLoginEmail()}
    />
    <StyledMargin />
    <FormikInput
      id="password-input"
      name="password"
      label={getLblLoginPassword()}
      placeholder={getPlhLoginPassword()}
      type="password"
    />
    <StyledMargin />
    <div className={"options"}>
      <FormikCheckBox id={"remember-me-input"} label={getLblRememberMe()} name={"remember"} />
      <Link id={"forgot-password-link"} href={Routes.ForgotPasswordPage()}>
        {getMsgLoginForgotPassword()}
      </Link>
    </div>
    <Button id={"submit-btn"} type={"submit"} primary={true} label={getLblLogin()} />

    <div>
      <p>{getMsgAgree()}</p>
      <Link href={"cms/privacy-policy"}>{getMsgPrivacyPolicy()}</Link>
    </div>

    <div className={"or"}>
      <div></div>
      <h2>{getMsgLoginOr()}</h2>
      <div></div>
    </div>

    <h3>{getMsgSocialMedia()}</h3>

    <div className={"social"}>
      <a href="/api/auth/facebook">
        <FacebookIcon />
      </a>
      <a href="/api/auth/google">
        <GoogleIcon />
      </a>
      <a href="/api/auth/apple">
        <AppleIcon />
      </a>
    </div>
  </StyledForm>
)
