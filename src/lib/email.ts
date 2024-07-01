import { site } from '@/config'
import { render } from '@react-email/render'
import nodemailer from 'nodemailer'
import { type ReactElement } from 'react'

export async function sendEmail(
  email: string,
  subject: string,
  element: ReactElement
) {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_FROM } =
    process.env
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  })

  try {
    await transporter.verify()
  } catch (error) {
    console.error({ error })
    return false
  }

  const html = render(element)
  const emailData = {
    from: `${site.name} <${MAIL_FROM}>`,
    to: email,
    subject,
    html
  }

  try {
    const sendResult = await transporter.sendMail(emailData)
    return sendResult.accepted.length > 0
  } catch (error) {
    return false
  }
}
