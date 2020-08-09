export class RegisterUserController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name.')
    }
  }
}
