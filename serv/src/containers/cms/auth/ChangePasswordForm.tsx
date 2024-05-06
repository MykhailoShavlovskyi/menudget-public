import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import resetPassword from "../../../db/auth/mutations/resetPassword"
import {
  ChangePasswordForm as Form,
  ResetPasswordFormValues,
} from "../../../components/cms/auth/ChangePasswordForm"
import { FORM_ERROR } from "../../../components/cms/common/form/Form"

export const ChangePasswordForm = () => {
  const router = useRouter()
  const token = router.query.token?.toString() as string
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
  }

  return <Form token={token} isSuccess={isSuccess} onSubmit={handleSubmit} />
}
