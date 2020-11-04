import { RegisterUserController } from '../../adapters/presentation/controllers/register-user-controller'
import { RegisterUserOnMailingList } from '../../usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { NodemailerEmailService } from '../../external/mail-services/nodemailler-email-service'
import { SendEmailToUserWithBonus } from '../../usecases/send-email-to-user-with-bonus/send-email-to-user-with-bonus'
import { getEmailOptions } from '../config/email'

export const makeRegisterUserController = (): RegisterUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUserOnMailingList(mongodbUserRepository)
  const nodemailerEmailService = new NodemailerEmailService()
  const sendEmailToUserWithBonus = new SendEmailToUserWithBonus(getEmailOptions(), nodemailerEmailService)
  const registerUserController = new RegisterUserController(registerUserOnMailingList, sendEmailToUserWithBonus)
  return registerUserController
}
