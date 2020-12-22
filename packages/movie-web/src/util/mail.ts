import * as mail from 'nodemailer'
import logger from '../core/log4js'
import Config from '../config'

export default async function sendEmail (
  to: string,
  subject: string,
  text?: string,
  html?: string
): Promise<void> {
  const { from, host, port, secure, auth } = Config.smtp
  const transporter = mail.createTransport({
    host: host,
    port: port,
    secure: secure, // true for 465, false for other ports
    auth: {
      user: auth.user,
      pass: auth.pass
    }
  })

  try {
    const info = await transporter.sendMail({
      from: `Movie Paradise <${from}>`, // sender address
      to: to,
      subject: subject,
      text: text,
      html: html
    })
    logger.info(`Email sent: ${info.messageId}`)
  } catch (e) {
    logger.error(`Email fail sent: ${e.message}`)
  }
}
