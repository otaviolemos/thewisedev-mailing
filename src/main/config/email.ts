import config from '../../config/config'
import { EmailOptions } from '../../usecases/ports/email-service'
import { MessageInfo } from '../../usecases/send-email-to-user-with-bonus/message-info'

const attachments = [{
  filename: 'clean-architecture.pdf',
  path: 'https://otaviolemos.github.io/clean-architecture.pdf'
}]

export function getEmailOptions (): EmailOptions {
  const from = 'Otávio Lemos | theWiseDev <otaviolemos@thewisedev.com.br>'
  const to = ''
  const mailOptions: EmailOptions = {
    host: config.get('email.host'),
    port: config.get('email.port'),
    username: config.get('email.username'),
    password: config.get('email.password'),
    from: from,
    to: to,
    subject: 'Teste',
    text: 'Teste',
    html: 'Teste',
    attachments: attachments
  }
  return mailOptions
}

export function getMessageInfo (): MessageInfo {
  return {
    subject: 'subject',
    text: 'Hello world attachment test',
    html: '<b>Hello world attachment test HTML</b>',
    attachments: attachments
  }
}

// TODO: CREATE A TYPE FOR THE FOLLOWING INFO MessageInfo
// subject: 'Teste',
// text: 'Teste',
// html: 'Teste',
// THIS INFO SHOULD BE SENT TO THE SEND EMAIL USE CASE!!!
