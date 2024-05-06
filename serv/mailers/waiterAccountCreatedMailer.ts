import { Message } from "postmark"
import { createPreviewEmailMessage, postmarkEmailServerClient } from "../postmark/postmark"
import previewEmail from "preview-email"

export function waiterAccountCreatedMailer({
  to,
  user_password,
}: {
  to: string
  user_password: string
}) {
  const msg: Message = {
    From: "info@menudget.com",
    To: to,
    Subject: "Waiter Account Created",
    HtmlBody: `
    <!DOCTYPE html>
    <html lang="en">
    <body>
    <h1>Hi from Menudget!</h1>
      <p>Here is your account information:</p>
      <p>Login: ${to}</p>
      <p>Password: ${user_password}</p>
      <p>We hope you enjoy using our service!
      If you have any questions, please contact us via Menudget@gmail.com</p>
      <p>Wish you all the best!</p>
      <p>Menudget team</p>
    </body>
    </html>
    `,
    TextBody: `
    Hi from Menudget!

      Here is your account information:
      Login: ${to}
      Password: ${user_password}
      We hope you enjoy using our service!
      If you have any questions, please contact us via menudget@gmail.com
      Wish you all the best!
      Menudget team
    `,
  }

  return {
    async send() {
      // await previewEmail(createPreviewEmailMessage(msg))
      // await postmarkEmailServerClient.sendEmail(msg)

      if (process.env.APP_ENV === "production") await postmarkEmailServerClient.sendEmail(msg)
      else await previewEmail(createPreviewEmailMessage(msg))
    },
  }
}
