import { SendEmailToUserWithBonus } from './send-email-to-user-with-bonus'
import { MailService, MailOptions } from '../ports/mail-service'
import { Right } from '../../shared/result'
import { MailServiceError } from '../ports/errors/mail-service-error'

class MailServiceStub implements MailService {
  async send (mailInfo: Object): Promise<any> {
    return 'my message'
  }
}

const makeSut = (): { sut: SendEmailToUserWithBonus, mailServiceStub: MailServiceStub } => {
  const mailServiceStub = new MailServiceStub()
  const sut = new SendEmailToUserWithBonus(mailServiceStub)
  return { sut, mailServiceStub }
}

const attachmentFilePath: string = '../resources/test.txt'

const fromName = 'Test'
const fromEmail = 'fromEmail@mail.com'
const toName = 'any_name'
const toEmail = 'any_email@mail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

var mailOptions: MailOptions = {
  host: 'test',
  port: 867,
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
  const result = await sut.sendEmailToUserWithBonus(mailOptions)
  expect(result).toBeInstanceOf(Right)
})

test('should raise error when email service fails', async () => {
  const { sut, mailServiceStub } = makeSut()
  jest.spyOn(mailServiceStub, 'send').mockReturnValueOnce(Promise.resolve(new Error()))
  const result = await sut.sendEmailToUserWithBonus(mailOptions)
  expect(result.value).toBeInstanceOf(MailServiceError)
})
