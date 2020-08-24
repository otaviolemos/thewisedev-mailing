import config from '../../config/config'
import { EmailOptions } from '../../usecases/ports/email-service'

export default (): EmailOptions => {
  const from = 'Otávio Lemos | theWiseDev <otaviolemos@thewisedev.com.br>'
  const to = ''
  const attachments = [{
    filename: 'lista-tecnicos.html',
    path: 'https://otaviolemos.github.io/lista-tecnicos.html'
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
