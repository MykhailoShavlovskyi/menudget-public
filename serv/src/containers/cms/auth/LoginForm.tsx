import { AuthenticationError } from "blitz"
import { FORM_ERROR } from "src/components/cms/common/form/Form"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import cmsLogin from "../../../db/auth/mutations/cmsLogin"
import { useRouter } from "next/router"
import { LoginForm as Form } from "../../../components/cms/auth/LoginForm"

export const LoginForm = () => {
  const [loginMutation] = useMutation(cmsLogin)
  const router = useRouter()

  return (
    <Form
      onSubmit={async (values) => {
        try {
          // Login
          await loginMutation(values)
          await router.push("/cms")
        } catch (error: any) {
          // Handle invalid credentials error
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          }

          // Handle invalid error
          else if (error.message === "Invalid role") {
            void router.push(Routes.Page403())
          }

          // Handle other errors
          else {
            return {
              [FORM_ERROR]: `Sorry, we had an unexpected error. Please try again. - ${error.toString()}`,
            }
          }
        }
      }}
    />
  )
}

export default LoginForm
