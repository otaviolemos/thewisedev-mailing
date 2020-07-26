import { SendEmailToUserWithAttachment } from './send-email-to-user-with-attachment'
import { MailService } from './port/mail-service'
import * as fs from 'fs'
import { Right } from '../shared/result'
import { MailServiceError } from './port/errors/mail-service-error'

// todo: generalize sendEmail use case: make it receive:
// fromName, fromEmail, toName, toEmail, subject, emailBody, emailBodyHtml, attachments?

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

const attachmentFilePath: string = 'test.txt'

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

var mailOptions = {
  from: fromName + ' ' + fromEmail,
  to: toName + ' <' + toEmail + '>',
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachments
}

test('should email user with attachment', async () => {
  const data = new Uint8Array(Buffer.from('testing 1 2 3'))
  createFile(attachmentFilePath, data)
  const { sut } = makeSut()
  const result = await sut.sendEmailToUserWithAttachment(mailOptions)
  expect(result).toBeInstanceOf(Right)
  deleteFile(attachmentFilePath)
})

test('should raise error when email service fails', async () => {
  const { sut, mailServiceStub } = makeSut()
  jest.spyOn(mailServiceStub, 'send').mockReturnValueOnce(Promise.resolve(false))
  const result = await sut.sendEmailToUserWithAttachment(mailOptions)
  expect(result.value).toBeInstanceOf(MailServiceError)
})

function createFile (name: string, data: Uint8Array): void {
  fs.writeFileSync(name, data)
}

function deleteFile (name: string): void {
  fs.unlinkSync(name)
}
