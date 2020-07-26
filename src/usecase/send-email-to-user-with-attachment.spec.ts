import { SendEmailToUserWithAttachment } from './send-email-to-user-with-attachment'
import { MailService } from './port/mail-service'
import * as fs from 'fs'

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

var mailInfo = {
  from: 'Test <formEmail@gmail.com>',
  to: 'Otávio Lemos <otaviolemos@gmail.com>',
  subject: 'Attachment',
  text: 'Hello world attachment test',
  html: '<b>Hello world attachment test HTML</b>',
  attachments: [{
    filename: attachmentFilePath,
    contentType: 'text/plain'
  }]
}

test('should email user with attachment', async () => {
  const data = new Uint8Array(Buffer.from('testing 1 2 3'))
  createFile(attachmentFilePath, data)
  const { sut } = makeSut()
  expect(await sut.sendEmailToUserWithAttachment(mailInfo)).toBeTruthy()
  deleteFile(attachmentFilePath)
})

test('should raise error when email service fails', async () => {
  const { sut, mailServiceStub } = makeSut()
  jest.spyOn(mailServiceStub, 'send').mockReturnValueOnce(Promise.resolve(false))
  expect(await sut.sendEmailToUserWithAttachment(mailInfo)).toBeFalsy()
})

function createFile (name: string, data: Uint8Array): void {
  fs.writeFileSync(name, data)
}

function deleteFile (name: string): void {
  fs.unlinkSync(name)
}
