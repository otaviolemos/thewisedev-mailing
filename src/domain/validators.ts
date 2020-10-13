var tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

export function validateEmail (email: string): boolean {
  if (!email) return false

  if (email.length > 256) return false

  if (!tester.test(email)) return false

  var [account, address] = email.split('@')
  if (account.length > 64) return false

  var domainParts = address.split('.')
  if (domainParts.some(function (part) {
    return part.length > 63
  })) return false

  return true
}

export function validateString (str: string): boolean {
  if (str == null || str === '') {
    return false
  }
  return true
}

export function validateName (name: string): boolean {
  if (name.length < 2 || name.length > 255) {
    return false
  }
  return true
}

module.exports = { validateEmail, validateString, validateName }
