import React, { useEffect } from "react"
import styled from "styled-components"
import { Form, FormProps } from "../common/form/Form"
import { object, string, TypeOf, z } from "zod"
import { Button } from "../common/input/Button"
import { Input } from "../common/input/Input"
import { useField } from "formik"
import { SSelect } from "../common/input/Select"
import { RightChevronIcon } from "../icons/RightChevronIcon"
import { StyledLabel } from "../common/Label"
import {
  getLblPassword,
  getLblEmail,
  getMsgChangePassword,
  getMsgLanguage,
  getHdrProfileSettings,
  getLblSaveChanges,
  getPlhPassword,
} from "../../../messages/profile" //region Schema

//region Schema

export type Lang = "eng" | "nl" | "de" | "chi" | "chi-en"

const schema = object({
  email: string().email().optional(),
  lang: z.enum(["eng", "nl", "de", "chi", "chi-en"]),
})

export type SettingsFormProps = TypeOf<typeof schema>

//endregion Schema

//region Style

const StyledContainer = styled.div`
  width: 100%;
  background-color: white;
`

const StyledForm = styled(Form)`
  padding: 1.875rem 2.125rem;
  width: 43.05rem;
  height: 100%;
  box-shadow: unset;
  z-index: 0;
  border: none;
`

const StyledHeader = styled.h1`
  margin: 0;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 3.125rem;
`

const StyledChangePasswordButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  label {
    cursor: pointer;
  }

  :hover {
    button {
      background: #f6f6f6;
    }
  }

  button {
    width: unset;
    background: none;
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }
`

const StyledSplitter = styled.div`
  height: 0.0625rem;
  background: #b6b6b6;
  width: 100%;
`

//endregion Style

//region Components

const EmailInput = ({ initialEmail }: { initialEmail?: string }) => {
  const [field, _, helpers] = useField("email")
  useEffect(() => {
    if (field.value === "") helpers.setValue(undefined)
  }, [field.value])

  //return <FormikInput id={"email-input"} name={"email"} label={lblEmail()} placeholder={initialEmail} />
  return (
    <Input
      id={"email-input"}
      name={"email"}
      label={getLblEmail()}
      placeholder={initialEmail}
      value={initialEmail}
    />
  )
}

const ChangePasswordInput = ({ onClick }: { onClick: () => void }) => (
  <StyledChangePasswordButtonContainer onClick={onClick}>
    <StyledLabel>{getMsgChangePassword()}</StyledLabel>
    <Button label={<RightChevronIcon />} />
  </StyledChangePasswordButtonContainer>
)

const languageOptions = [
  { label: "English", value: "eng" },
  { label: "Dutch", value: "nl" },
  { label: "German", value: "de" },
  { label: "Chinese", value: "chi" },
  { label: "Chinese/Eng", value: "chi-en" },
]
const LanguageSelect = () => {
  const [field, _, helpers] = useField("lang")

  return (
    <SSelect
      id={"language-input"}
      label={getMsgLanguage()}
      options={languageOptions}
      value={[field.value]}
      onChange={(v) => helpers.setValue(v[0])}
    />
  )
}

//endregion Components

type Props = Pick<FormProps<typeof schema>, "initialValues" | "onSubmit"> & {
  onSetChangingPassword: (v: boolean) => void
}

export const SettingsForm = ({ initialValues, onSetChangingPassword, onSubmit }: Props) => (
  <StyledContainer>
    <StyledForm
      id={"settings-form"}
      schema={schema}
      initialValues={initialValues ?? {}}
      onSubmit={onSubmit}
    >
      <>
        <StyledHeader>{getHdrProfileSettings()}</StyledHeader>
        <EmailInput initialEmail={initialValues?.email} />
        <Input
          id="password-input"
          name="password"
          label={getLblPassword()}
          placeholder={getPlhPassword()}
          type="password"
          value={"xxxxxxxxxxxxx"}
        />
        <ChangePasswordInput onClick={() => onSetChangingPassword(true)} />
        <StyledSplitter />
        <LanguageSelect />
        <Button primary={true} type={"submit"} label={getLblSaveChanges()} />
      </>
    </StyledForm>
  </StyledContainer>
)
