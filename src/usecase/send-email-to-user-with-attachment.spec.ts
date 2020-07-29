import { SendEmailToUserWithAttachment } from './send-email-to-user-with-attachment'
import { MailService, MailOptions } from './port/mail-service'
import { Right } from '../shared/result'
import { MailServiceError } from './port/errors/mail-service-error'

class MailServiceStub implements MailService {
  async send (mailInfo: Object): Promise<boolean> {
    return true
  }
}

const makeSut = (): { sut: SendEmailToUserWithAttachment, mailServiceStub: MailServiceStub } => {
  const mailServiceStub = new MailServiceStub()
  const sut = new SendEmailToUserWithAttachment(mailServiceStub)
  return { sut, mailServiceStub }
}

const attachmentFilePath: string = '../resources/test.txt'

const fromName = 'Test'
const fromEmail = 'formEmail@gmail.com'
const toName = 'Otávio Lemos'
const toEmail = 'otaviolemos@gmail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

var mailOptions: MailOptions = {
  service: 'test',
  username: 'test',
  password: 'test',
  from: fromName + ' ' + fromEmail,
  to: toName + ' <' + toEmail + '>',
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachments
}

test('should email user with attachment', async () => {
  const { sut } = makeSut()
  const result = await sut.sendEmailToUserWithAttachment(mailOptions)
  expect(result).toBeInstanceOf(Right)
})

test('should raise error when email service fails', async () => {
  const { sut, mailServiceStub } = makeSut()
  jest.spyOn(mailServiceStub, 'send').mockReturnValueOnce(Promise.resolve(false))
  const result = await sut.sendEmailToUserWithAttachment(mailOptions)
  expect(result.value).toBeInstanceOf(MailServiceError)
})
