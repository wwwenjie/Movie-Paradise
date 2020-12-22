import UserServiceImpl from '../service/user-service'
import { body, path, prefix, query, request, responses, summary, tagsAll } from 'koa-swagger-decorator/dist'
import { check, checkAdmin, getUid } from '../core/jwt'
import { userProperties } from './swagger-definition'

const userService = new UserServiceImpl()

@tagsAll('User Controller')
@prefix('/users')
export default class UserController {
  @request('post', '/tokens')
  @summary('user login')
  @body({
    email: { type: 'string', example: 'admin' },
    password: { type: 'string', example: 'admin' }
  })
  @responses({
    200: {
      description: 'user and token',
      schema: {
        type: 'object',
        properties: {
          token: 'token',
          ...userProperties
        }
      }
    }
  })
  async login (ctx): Promise<void> {
    ctx.body = await userService.login(ctx.request.body)
  }

  @request('post', '')
  @summary('user register')
  @body({
    name: { type: 'string', example: 'admin' },
    email: { type: 'string', example: 'admin' },
    password: { type: 'string', example: 'admin' }
  })
  async register (ctx): Promise<void> {
    ctx.body = await userService.register(ctx.request.body)
  }

  @request('patch', '/{uid}')
  @summary('update user (only for users themselves)')
  @path({
    uid: { type: 'string', required: true, description: 'user id' }
  })
  @body(userProperties)
  @check()
  async update (ctx): Promise<void> {
    ctx.body = await userService.update(ctx.params.uid, ctx.request.body)
  }

  @request('delete', '/{uid}')
  @summary('delete user (only for users themselves)')
  @path({
    uid: { type: 'string', required: true, description: 'user id' }
  })
  @query({
    password: { type: 'string', required: true, description: 'user password' }
  })
  async delete (ctx): Promise<void> {
    ctx.body = await userService.delete(ctx.params.uid, ctx.request.query.password)
  }

  @request('post', '/{uid}/avatar')
  @summary('upload user avatar to oss (only for users themselves)')
  @path({
    uid: { type: 'string', required: true, description: 'user id' }
  })
  @check(1)
  async uploadAvatar (ctx): Promise<void> {
    const file = ctx.request.files.avatar
    // extend name is unnecessary
    file.name = getUid(ctx.auth)
    ctx.body = await userService.uploadAvatar(file)
  }

  @request('get', '/{uid}')
  @summary('get user by user id (public, no password and email)')
  @path({
    uid: { type: 'string', required: true, description: 'user id' }
  })
  @responses({ 200: { description: 'user object', schema: { type: 'object', properties: userProperties } } })
  async findByUid (ctx): Promise<void> {
    ctx.body = await userService.getByUid(ctx.params.uid)
  }

  @request('get', '')
  @summary('get user list (admin)')
  @query({
    limit: { type: 'number', default: 8 },
    offset: { type: 'number', default: 0 }
  })
  @checkAdmin()
  async getUserList (ctx): Promise<void> {
    const { limit, offset } = ctx.query
    ctx.body = await userService.getUserList(limit, offset)
  }
}
