import config from '../../config/config'
import { EmailOptions } from '../../usecases/ports/email-service'

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
    subject: 'Bem-vindo à comunidade theWiseDev!',
    text: 'Estou muito contente de ter você por aqui! Esse é o começo de uma comunidade de desenvolvimento de software de excelência. \n \n' +
      'Conto contigo para construirmos a melhor plataforma de treinamento de desenvolvedores do Brasil. \n \n' +
      'Enquanto isso, fique com esse pequeno presente que preparamos para você com muito carinho: um pôster da Clean Architecture! \n \n' +
      'Espero que você curte... \n \n' +
      'Um abraço e até a próxima, \n' +
      'Otávio Lemos | theWiseDev',
    html: 'Estou muito contente de ter você por aqui! Esse é o começo de uma <b>comunidade de desenvolvimento de software de excelência</b>. <br> <br>' +
      'Conto contigo para construirmos <i>a melhor plataforma de treinamento de desenvolvedores do Brasil</i>. <br> <br>' +
      'Enquanto isso, fique com esse pequeno presente que preparamos para você com muito carinho: um pôster da <b>Clean Architecture</b>! <br> <br>' +
      'Tenho certeza que você vai curtir! <br> <br>' +
      'Um abraço e até a próxima, <br>' +
      '<b>Otávio Lemos | theWiseDev</b> <br> <br> ',
    // '<img src="https://otaviolemos.github.io/theWiseDev-signature.png">',
    attachments: attachments
  }
  return mailOptions
}

// TODO: CREATE A TYPE FOR THE FOLLOWING INFO MessageInfo
// subject: 'Teste',
// text: 'Teste',
// html: 'Teste',
// THIS INFO SHOULD BE SENT TO THE SEND EMAIL USE CASE!!!
