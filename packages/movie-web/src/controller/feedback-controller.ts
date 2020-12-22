import { body, prefix, request, summary, tagsAll } from 'koa-swagger-decorator/dist'
import Config from '../config'
import sendEmail from '../util/mail'

@tagsAll('Feedback Controller')
@prefix('/feedback')
export default class FeedbackController {
  @request('post', '')
  @summary('add feedback')
  @body({
    category: { type: 'string', example: 'Suggest a feature' },
    summary: { type: 'string', example: 'Feedback summary' },
    detail: { type: 'string', example: 'Feedback detail (optional)' },
    email: { type: 'string', example: 'User email (optional)' }
  })
  async addFeedback (ctx): Promise<void> {
    const { category, summary, detail, email } = ctx.request.body
    // todo: html
    await sendEmail(
      Config.smtp.from,
      'New Feedback',
      `
      Category: ${category}\n
      Summary: ${summary}\n
      Detail: ${detail}\n
      Email: ${email}\n
      `
    )
    ctx.status = 204
  }
}
