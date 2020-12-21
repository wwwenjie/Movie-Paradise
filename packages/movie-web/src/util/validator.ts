import E from '../error/ErrorEnum'

export default class Validator {
  static required=(value: string): string => {
    if (!(value === null || value === undefined || value.length === 0)) {
      return value
    }
    throw E.VerificationFailed
  }

  static min=(value: string, length: number): string => {
    if (value.length >= length) {
      return value
    }
    throw E.VerificationFailed
  }

  static email=(value: string): string => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (pattern.test(value)) {
      return value
    }
    throw E.VerificationFailed
  }
}
