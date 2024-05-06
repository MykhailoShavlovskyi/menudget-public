import { useMutation } from "@blitzjs/rpc"
import forgotPassword from "../../../db/auth/mutations/forgotPassword"
import {
  ForgotPasswordForm as Form,
  ForgotPasswordFormValues,
} from "../../../components/cms/auth/ForgotPasswordForm"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"

export const ForgotPasswordForm = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPasswordMutation(values)
      return {}
    } catch (error: any) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
      }
    }
  }

  return <Form isSuccess={isSuccess} onSubmit={handleSubmit} />
}
