import CError from './CError'

enum HTTP {
  BadRequest=400,
  Unauthorized=401,
  Forbidden=403,
  NotFound=404,
  MethodNotAllowed=405,
  Conflict=409,
  InternalServerError=500,
  NotImplemented=501,
  BadGateway=502,
  ServiceUnavailable=503
}

// enum can not used for object, so here is const
const E = {
  AccountWrong: new CError({
    'en-US': 'Email or password is wrong',
    'zh-CN': '邮箱或密码错误'
  }, 40001, HTTP.Unauthorized),

  NameExist: new CError({
    'en-US': 'Name already used',
    'zh-CN': '用户名已被使用'
  }, 40002, HTTP.Conflict),

  EmailExist: new CError({
    'en-US': 'Email already used',
    'zh-CN': '邮箱已被使用'
  }, 40003, HTTP.Conflict),

  AuthRequired: new CError({
    'en-US': 'Please login first',
    'zh-CN': '请先登陆'
  }, 40004, HTTP.Unauthorized),

  Forbidden: new CError({
    'en-US': 'The resources you request is forbidden',
    'zh-CN': '您请求的资源是被禁止的'
  }, 40005, HTTP.Forbidden),

  AuthError: new CError({
    'en-US': 'Authentication failed',
    'zh-CN': '身份验证失败'
  }, 40006, HTTP.Unauthorized),

  MissParams: new CError({
    'en-US': 'Miss params',
    'zh-CN': '缺少请求参数'
  }, 40007, HTTP.BadRequest),

  UserNotFound: new CError({
    'en-US': 'Can not find this user',
    'zh-CN': '找不到此用户'
  }, 40008, HTTP.NotFound),

  VerificationFailed: new CError({
    'en-US': 'Verification failed',
    'zh-CN': '验证未通过'
  }, 40009, HTTP.BadRequest),

  OSSPutError: new CError({
    'en-US': 'Fail to upload this to our server',
    'zh-CN': '无法上传此文件至我们的服务器'
  }, 50000, HTTP.InternalServerError),

  MailFailToSend: new CError({
    'en-US': 'Fail to send email, please contact admin to check',
    'zh-CN': '无法发送邮件，请联系管理员检查'
  }, 50001, HTTP.InternalServerError)
}

export default E
