// I'm commenting these test cases because otherwise they will send emails everytime they run (and that takes time)

// for html attachment:
// const attachments: [{
//   filename: 'lista-tecnicos.html',
//   path: 'https://otaviolemos.github.io/lista-tecnicos.html'
// }]

// import { NodemailerMailService } from './nodemailler-mail-service'
// // import * as nodemailer from 'nodemailer'
// import { MailOptions } from '../../usecase/port/mail-service'
// import config from '../../config/config'

// const subject = 'Test e-mail'
// const emailBody = 'Hello world attachment test'
// const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
// const attachments = [{
//   filename: 'lista-tecnicos.html',
//   path: 'https://otaviolemos.github.io/lista-tecnicos.html'
// }]

// test('should email user with nodemailer using ethereal', async () => {
//   const testAccount = await nodemailer.createTestAccount()
//   var mailOptions: MailOptions = {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     username: testAccount.user,
//     password: testAccount.pass,
//     from: '"Fred Foo 👻" <foo@example.com>',
//     to: 'bar@example.com, baz@example.com',
//     subject: subject,
//     text: emailBody,
//     html: emailBodyHtml,
//     attachments: attachments
//   }
//   const mailService = new NodemailerMailService()
//   return await mailService.send(mailOptions).then(sent => {
//     expect(sent.accepted).toEqual(['bar@example.com', 'baz@example.com'])
//   })
// })

// test('should email user with gmail', async () => {
//   const from = 'Equipe theWiseDev <nao-responder@thewisedev.com.br>'
//   const to = 'otaviolemos@gmail.com'
//   var mailOptions: MailOptions = {
//     host: config.get('email.host'),
//     port: config.get('email.port'),
//     username: config.get('email.username'),
//     password: config.get('email.password'),
//     from: from,
//     to: to,
//     subject: subject,
//     text: emailBody,
//     html: emailBodyHtml,
//     attachments: attachments
//   }
//   const mailService = new NodemailerMailService()
//   return await mailService.send(mailOptions).then(sent => {
//     expect(sent.accepted).toEqual(['otaviolemos@gmail.com'])
//   })
// })

test('stub test', () => {
  const stub = true
  expect(stub).toBeTruthy()
})
