import { User } from '../entities/user'
import { SendEmailToUserWithAttachment } from './send-email-to-user-with-attachment'
import { MailService } from './port/mail-service'

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
  const user: User = new User('Otávio Lemos', 'otaviolemos@gmail.com')
  const attachmentFilePath: string = '../resources/test.pdf'
  var mailInfo = {
    from: 'Test <formEmail@gmail.com>',
    to: user.email,
    subject: 'Attachment',
    text: 'Hello world attachment test',
    html: '<b>Hello world attachment test HTML</b>',
    attachments: [{
      filename: attachmentFilePath,
      contentType: 'application/pdf'
    }]
  }
  const sut = makeSut()
  expect(sut.sendEmailToUserWithAttachment(mailInfo)).toBeTruthy()
})
