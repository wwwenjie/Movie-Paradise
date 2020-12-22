import UserServiceImpl from '../../service/user-service'
import InitManager from '../../core/init'
import User from '../../entity/mongodb/user'
import E from '../../error/ErrorEnum'
import { ObjectID } from 'mongodb'

describe('user service test', () => {
  let userService: UserServiceImpl
  let user: User
  const uid = ObjectID()
  const name = 'User Name'
  const email = 'user@test.com'
  const password = 'test1234'

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  beforeAll(() => {
    return InitManager.initLoadDatabase()
  })

  beforeEach(() => {
    userService = new UserServiceImpl()
    user = new User()
    user._id = uid
    user.name = name
    user.email = email
    user.password = password
  })

  test('register', async () => {
    await userService.register(user)
    try {
      await userService.register(user)
    } catch (e) {
      expect(e).toBe(E.NameExist)
    }
    user.name = name + 'update'
    try {
      await userService.register(user)
    } catch (e) {
      expect(e).toBe(E.EmailExist)
    }
  })

  test('login', async () => {
    await userService.login(user)
    user.password = password + 'update'
    try {
      await userService.login(user)
    } catch (e) {
      expect(e).toBe(E.AccountWrong)
    }
  })

  test('update', async () => {
    // @ts-expect-error
    user.currentPassword = password
    user.email = email + 'update'
    user.name = name + 'update'
    user.admin = true
    await userService.update(uid, user)
    const updatedUser = await userService.getByUid(uid)
    expect(updatedUser.name).toStrictEqual(user.name)
  })

  test('getAdminUid', async () => {
    const adminUid = await userService.getAdminUid()
    expect(adminUid.includes(uid.toString())).toBeTruthy()
  })

  test('delete', async () => {
    await userService.delete(uid, password)
    try {
      await userService.getByUid(uid)
    } catch (e) {
      expect(e).toBe(E.UserNotFound)
    }
  })
})
