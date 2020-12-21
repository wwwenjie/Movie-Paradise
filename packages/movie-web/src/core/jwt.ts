import E from '../error/ErrorEnum'
import * as jwt from 'jsonwebtoken'
import config from '../config'
import CError from '../error/CError'

/**
 * @param index: the index of uid in url(from right to left). 0 means last one, 1 means second last...
 */
const check = (index = 0) => (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  const func = descriptor.value
  descriptor.value = function (...args) {
    const auth = args[0].request.header.authorization
    if (auth === undefined) {
      throw E.AuthRequired
    }
    const urlArray: string[] = args[0].request.url.split('/')
    let uid: string
    for (let i = 0; i <= index; i++) {
      uid = urlArray.pop()
    }
    if (uid !== getUid(auth)) {
      throw E.Forbidden
    }
    return func.apply(this, args)
  }
}

const checkAdmin = () => (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  const func = descriptor.value
  descriptor.value = function (...args) {
    const auth = args[0].request.header.authorization
    if (auth === undefined) {
      throw E.AuthRequired
    }
    // check if auth is okay
    getUid(auth)
    const decoded: any = jwt.verify(auth, config.jwtSecret)
    if (decoded.admin !== true) {
      throw E.Forbidden
    }
    return func.apply(this, args)
  }
}

function getUid (auth: string): string {
  if (auth === undefined) {
    throw E.AuthRequired
  }
  const token: string = auth.trim().split(' ').pop()
  let decoded
  try {
    decoded = jwt.verify(token, config.jwtSecret)
  } catch (e) {
    throw new CError(E.AuthError.locale, E.AuthError.code, E.AuthError.status, e.message)
  }
  return decoded.uid
}

function checkUid (uid: string, auth: string): void {
  const authUid = this.getUid(auth)
  if (authUid !== uid) {
    throw E.AuthError
  }
}

export {
  check,
  checkAdmin,
  getUid,
  checkUid
}
