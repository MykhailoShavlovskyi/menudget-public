import {
  Lang,
  SettingsForm as Form,
  SettingsFormProps,
} from "../../../components/cms/profile/SettingsForm"
import { useMutation } from "@blitzjs/rpc"
import updateEmail from "../../../db/auth/mutations/updateEmail"
import { addAlert } from "../../../components/cms/Alerts"
import { useState } from "react"
import { PasswordForm, PasswordFormProps } from "../../../components/cms/profile/PasswordForm"
import updatePassword from "../../../db/auth/mutations/updatePassword"
import { localeKey } from "../../../components/cms/IntlProvider"
import { useIntl } from "react-intl"
import { useRefresh } from "../../../lib/useRefresh"

export const SettingsForm = ({
  userId,
  userEmail,
  lang,
}: {
  userId: number
  userEmail: string
  lang: Lang
}) => {
  const [changingPassword, setChangingPassword] = useState(false)

  // Handle settings submit
  const [updateEmailMutation] = useMutation(updateEmail)

  const handleSettingsSubmit = async (props: SettingsFormProps) => {
    //if (props.email) {
    //  await updateEmailMutation({ id: userId, email: props.email })
    //  addAlert("Your email was updated")
    //}
    // TODO change lang

    localStorage.setItem(localeKey, props.lang)
    window.location.reload()
  }

  // Handle password submit
  const [updatePasswordMutation] = useMutation(updatePassword)
  const handlePasswordSubmit = async (props: PasswordFormProps) => {
    await updatePasswordMutation({ id: userId, password: props.password })
    addAlert("Your password was updated")
  }

  if (changingPassword)
    return (
      <PasswordForm
        initialValues={{ password: "", confirmation: "" }}
        onSubmit={handlePasswordSubmit}
        onGoBack={() => setChangingPassword(false)}
      />
    )
  return (
    <Form
      initialValues={{ email: userEmail, lang }}
      onSubmit={handleSettingsSubmit}
      onSetChangingPassword={setChangingPassword}
    />
  )
}
