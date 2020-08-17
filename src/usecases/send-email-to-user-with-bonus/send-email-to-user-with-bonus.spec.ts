import { SendEmailToUserWithBonus } from './send-email-to-user-with-bonus'
import { EmailService, EmailOptions } from '../ports/email-service'
import { Right } from '../../shared/result'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { User } from '../../domain/user'

// todo - refactor: make MailService have a MailOptions attribute and set everything upon construction (use a default 'to' email)
// todo - refactor: make MailService have a setTo method that receives name and email and
//                  sets the 'to' field: to: name + ' <' + email + '>'
// todo - refactor: make sendEmailToUserWithBonus receive only the User and set the 'to' part of the MailService

const attachmentFilePath: string = '../resources/test.txt'

const fromName = 'Test'
const fromEmail = 'from_email@mail.com'
const toName = 'any_name'
const toEmail = 'any_email@mail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

var mailOptions: EmailOptions = {
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

class MailServiceStub implements EmailService {
  async send (mailInfo: EmailOptions): Promise<any> {
    return 'my message'
  }
}

const makeSut = (): { sut: SendEmailToUserWithBonus, mailServiceStub: MailServiceStub } => {
  const mailServiceStub = new MailServiceStub()
  const sut = new SendEmailToUserWithBonus(mailOptions, mailServiceStub)
  return { sut, mailServiceStub }
}

test('should email user with attachment', async () => {
  const { sut } = makeSut()
  const result = await sut.sendEmailToUserWithBonus(new User(toName, toEmail))
  expect(result).toBeInstanceOf(Right)
})

test('should raise error when email service fails', async () => {
  const { sut, mailServiceStub } = makeSut()
  jest.spyOn(mailServiceStub, 'send').mockReturnValueOnce(Promise.resolve(new Error()))
  const result = await sut.sendEmailToUserWithBonus(new User(toName, toEmail))
  expect(result.value).toBeInstanceOf(MailServiceError)
})
