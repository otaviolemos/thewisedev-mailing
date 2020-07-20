import { SendEmailToUserWithAttachment } from './send-email-to-user-with-attachment'
import { MailService } from './port/mail-service'
import * as fs from 'fs'

const makeSut = (): SendEmailToUserWithAttachment => {
  class MailServiceStub implements MailService {
    send (mailInfo: Object): boolean {
      return true
    }
  }
  const mailServiceStub = new MailServiceStub()
  return new SendEmailToUserWithAttachment(mailServiceStub)
}

test('should email user with attachment', () => {
  const attachmentFilePath: string = 'test.txt'
  const data = new Uint8Array(Buffer.from('testing 1 2 3'))
  createFile(attachmentFilePath, data)
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
  const sut = makeSut()
  expect(sut.sendEmailToUserWithAttachment(mailInfo)).toBeTruthy()
  deleteFile(attachmentFilePath)
})

function createFile (name: string, data: Uint8Array): void {
  fs.writeFileSync(name, data)
}

function deleteFile (name: string): void {
  fs.unlinkSync(name)
}
