import { NodemailerEmailService } from './nodemailler-email-service'
import { EmailOptions } from '../../usecases/ports/email-service'
import { MailServiceError } from '../../usecases/errors/mail-service-error'

const makeSut = (): NodemailerEmailService => {
  return new NodemailerEmailService()
}

const attachmentFilePath: string = 'any_file_path'

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
  host: 'any_host',
  port: 867,
  username: 'any_username',
  password: 'any_password',
  from: fromName + ' ' + fromEmail,
  to: toName + ' <' + toEmail + '>',
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachments
}

jest.mock('nodemailer')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer')
const sendMailMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

beforeEach(() => {
  sendMailMock.mockClear()
  nodemailer.createTransport.mockClear()
})

describe('Nodemailer mail service adapter', () => {
  test('should return ok if email is sent', async () => {
    const sut = makeSut()
    sendMailMock.mockReturnValueOnce('ok')
    const result = await sut.send(mailOptions)
    expect(result.value).toEqual(mailOptions)
  })

  test('should call nodemailer createTransport with correct options', async () => {
    const sut = makeSut()
    const spyCreateTransport = jest.spyOn(nodemailer, 'createTransport')
    await sut.send(mailOptions)
    expect(spyCreateTransport).toHaveBeenCalledWith({
      host: 'any_host',
      port: 867,
      auth: {
        user: 'any_username',
        pass: 'any_password'
      }
    })
  })

  test('should return error if email is not sent', async () => {
    const sut = makeSut()
    sendMailMock.mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.send(mailOptions)
    expect(result.value).toBeInstanceOf(MailServiceError)
  })
})
