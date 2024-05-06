import { Message, ServerClient as PostmarkServerClient } from "postmark"
import { Options } from "nodemailer/lib/mailer"

const serverToken = process.env.POSTMARK_TOKEN
if (!serverToken) throw new Error("No POSTMARK_TOKEN defined")
export const postmarkEmailServerClient = new PostmarkServerClient(serverToken)

export function createPreviewEmailMessage(msg: Message): Options {
  return { text: msg.TextBody }
}
