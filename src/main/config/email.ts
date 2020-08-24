import config from '../../config/config'
import { EmailOptions } from '../../usecases/ports/email-service'

export default (): EmailOptions => {
  const from = 'Otávio Lemos | theWiseDev <otaviolemos@thewisedev.com.br>'
  const to = ''
  const attachments = [{
    filename: 'clean-architecture.pdf',
    path: 'https://otaviolemos.github.io/clean-architecture.pdf'
  }]
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

// TODO: CREATE A TYPE FOR THE FOLLOWING INFO MessageInfo
// subject: 'Teste',
// text: 'Teste',
// html: 'Teste',
// THIS INFO SHOULD BE SENT TO THE SEND EMAIL USE CASE!!!
