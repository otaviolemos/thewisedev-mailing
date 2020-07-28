// I'm commenting the test case because otherwise it will send an email everytime it runs ;)

// import { NodemailerMailService } from './nodemailler-mail-service'

// const attachmentFilePath: string = '../resources/test.txt'

// const fromName = 'Equipe theWiseDev'
// const fromEmail = 'nao-responder@thewisedev.com.br'
// const toName = 'Otávio Lemos'
// const toEmail = 'otaviolemos@gmail.com'
// const subject = 'Test e-mail'
// const emailBody = 'Hello world attachment test'
// const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
// const attachments = [{
//   filename: attachmentFilePath,
//   contentType: 'text/plain'
// }]

// var mailOptions = {
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
