// I'm commenting the test case because otherwise it will send an email everytime it runs ;)

// TODO: change test case to ethereal

// for html attachment:
// const attachments: [{
//   filename: 'lista-tecnicos.html',
//   path: 'https://otaviolemos.github.io/lista-tecnicos.html'
// }]

// import { NodemailerMailService } from './nodemailler-mail-service'
// import config from '../../config/config'
// import { MailOptions } from '../../usecase/port/mail-service'

// const service = config.get('email.service')
// const username = config.get('email.username')
// const password = config.get('email.password')
// const fromName = 'Equipe theWiseDev'
// const fromEmail = 'nao-responder@thewisedev.com.br'
// const toName = 'Otávio Lemos'
// const toEmail = 'otaviolemos@gmail.com'
// const subject = 'Test e-mail'
// const emailBody = 'Hello world attachment test'
// const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
// const attachments = [{
//   filename: 'lista-tecnicos.html',
//   path: 'https://otaviolemos.github.io/lista-tecnicos.html'
// }]

// var mailOptions: MailOptions = {
//   service: service,
//   username: username,
//   password: password,
//   from: fromName + ' ' + fromEmail,
//   to: toName + ' <' + toEmail + '>',
//   subject: subject,
//   text: emailBody,
//   html: emailBodyHtml,
//   attachments: attachments
// }

// test('should email user with nodemailer', async () => {
//   const mailService = new NodemailerMailService()
//   const sent = await mailService.send(mailOptions)
//   expect(sent).toBeTruthy()
// })

test('stub test', () => {
  const stub = true
  expect(stub).toBeTruthy()
})
