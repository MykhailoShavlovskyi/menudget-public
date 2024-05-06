import { createPreviewEmailMessage, postmarkEmailServerClient } from "../postmark/postmark"
import previewEmail from "preview-email"
import { Message } from "postmark"

export function forgotPasswordMailer({ to, token }: { to: string; token: string }) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/auth/change-password?token=${token}`

  const msg: Message = {
    From: "info@menudget.com",
    To: to,
    Subject: "Your Password Reset Instructions",
    HtmlBody: `<!DOCTYPE html>
    <html lang="en">
    <body>
        <h1>Reset Your Password</h1>

        <a href="${resetUrl}">
            Click here to set a new password
        </a>
    </body>
    </html>`,
    TextBody: `
      Reset Your Password

      href=${resetUrl}
      Click here to set a new password
      `,
  }

  return {
    async send() {
      if (process.env.APP_ENV === "production") await postmarkEmailServerClient.sendEmail(msg)
      else await previewEmail(createPreviewEmailMessage(msg)).then(console.log).catch(console.error)
    },
  }
}
