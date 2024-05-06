import { getLblGoBack, getMsgLoginFailed } from "../../../messages/auth"

export const LoginFailed = ({ error }: { error?: string }) => (
  <>
    <div>{getMsgLoginFailed()}</div>
    <div>{error}</div>
    <a href="/cms/auth/login">
      <button>{getLblGoBack()}</button>
    </a>
  </>
)
