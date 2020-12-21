import User from '../entity/mongodb/user'
import { getConnection } from 'typeorm'
import { ObjectID } from 'mongodb'
import E from '../error/ErrorEnum'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import config from '../config'
import OSS from '../util/oss'
import * as fs from 'fs'
import logger from '../core/log4js'
import Validator from '../util/validator'

interface UserService {
  login: (user: User) => Promise<User>

  register: (user: User) => Promise<void>

  update: (uid: string, user: User) => Promise<void>

  delete: (uid: string, password: string) => Promise<void>

  uploadAvatar: (file: File) => Promise<string>

  getByUid: (uid: string) => Promise<User>

  getAdminUid: () => Promise<string[]>

  getUserList: (limit: string, offset: string) => Promise<User[]>
}

export default class UserServiceImpl implements UserService {
  private readonly userRepository = getConnection('mongodb').getMongoRepository(User)

  async login (user: User): Promise<User> {
    const result = await this.userRepository.findOne({
      email: user.email
    })
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (result !== undefined && await bcrypt.compare(user.password, result.password)) {
      // warn: permanent valid
      const adminUid = await this.getAdminUid()
      const token = jwt.sign({
        uid: result._id,
        admin: adminUid.includes(result._id.toString()) ? true : undefined
      },
      config.jwtSecret,
      {
        issuer: 'https://github.com/wwwenjie/Movie-Paradise'
      })
      delete result.password
      // @ts-expect-error
      result.token = token
      return result
    } else {
      throw E.AccountWrong
    }
  }

  async register (user: User): Promise<void> {
    await this.checkIndex(user)
    Validator.email(user.email)
    Validator.min(user.password, 8)
    Validator.required(user.name)
    user.create_time = new Date()
    user.list = []
    user.like = []
    user.watched = []
    user.password = await bcrypt.hash(user.password, 10)
    await this.userRepository.insertOne(user)
  }

  async update (uid: string, user: User): Promise<void> {
    if (user.email !== undefined || user.name !== undefined) {
      await this.checkIndex(user)
    }
    // check currentPassword
    if (user.email !== undefined || user.password !== undefined) {
      const res = await this.userRepository.findOne({
        _id: ObjectID(uid)
      })
      // @ts-expect-error
      if (!await bcrypt.compare(user.currentPassword, res.password)) {
        throw E.AccountWrong
      }
      if (user.password !== undefined) {
        user.password = await bcrypt.hash(user.password, 10)
      }
    }
    // @ts-expect-error
    delete user.currentPassword
    await this.userRepository.updateOne({ _id: ObjectID(uid) }, {
      $set: user
    })
  }

  async delete (uid: string, password: string): Promise<void> {
    const user = await this.userRepository.findOne({
      _id: ObjectID(uid)
    })
    if (await bcrypt.compare(password, user.password)) {
      await this.userRepository.deleteOne({
        _id: ObjectID(uid)
      })
    } else {
      throw E.AuthError
    }
  }

  async uploadAvatar (file: File): Promise<string> {
    // @ts-expect-error
    const path: string = file.path
    // file.name = user._id
    const url = await OSS.putAvatar(file.name, path)
    // todo: if user change avatar, the avatar needn't update
    const user = new User()
    user.avatar = url
    await this.update(file.name, user)
    fs.unlink(path, (err) => {
      if (err !== null) {
        logger.error(err)
      }
    })
    return url
  }

  async getByUid (uid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      _id: ObjectID(uid)
    })
    if (user === undefined) {
      throw E.UserNotFound
    }
    // Obviously, findOne does not provide a exclusion option
    delete user.email
    delete user.password
    return user
  }

  async getAdminUid (): Promise<string[]> {
    const users = await this.userRepository.find({
      select: ['_id'],
      where: {
        admin: true
      }
    })
    return users.map(user => user._id.toString())
  }

  async getUserList (limit: string = '8', offset: string = '0'): Promise<User[]> {
    return await this.userRepository.find({
      take: parseInt(limit),
      skip: parseInt(offset)
    })
  }

  async checkIndex (user): Promise<void> {
    if (await this.userRepository.findOne({
      name: user.name
    }) !== undefined) {
      throw E.NameExist
    }
    if (await this.userRepository.findOne({
      email: user.email
    }) !== undefined) {
      throw E.EmailExist
    }
  }
}
