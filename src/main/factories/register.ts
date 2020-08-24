import { RegisterUserController } from '../../adapters/presentation/controllers/register-user-controller'
import { ValidatorEmailValidator } from '../../adapters/util/validator-email-validator'
import { RegisterUserOnMailingList } from '../../usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { MongodbUserRepository } from '../../adapters/repositories/mongodb/mongodb-user-repository'
import { NodemailerEmailService } from '../../adapters/mail-services/nodemailler-email-service'
import { SendEmailToUserWithBonus } from '../../usecases/send-email-to-user-with-bonus/send-email-to-user-with-bonus'
import { getEmailOptions, getMessageInfo } from '../config/email'

export const makeRegisterUserController = (): RegisterUserController => {
  const validatorEmailValidator = new ValidatorEmailValidator()
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUserOnMailingList(mongodbUserRepository)
  const nodemailerEmailService = new NodemailerEmailService()
  const sendEmailToUserWithBonus = new SendEmailToUserWithBonus(getEmailOptions(), nodemailerEmailService, getMessageInfo())
  const registerUserController = new RegisterUserController(validatorEmailValidator, registerUserOnMailingList, sendEmailToUserWithBonus)
  return registerUserController
}
