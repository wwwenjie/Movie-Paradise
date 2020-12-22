import ImprovementServiceImpl from '../service/improvement-service'
import { body, prefix, request, responses, summary, tagsAll } from 'koa-swagger-decorator/dist'
import { movieProperties } from './swagger-definition'

const improvementService = new ImprovementServiceImpl()

@tagsAll('Improvement Controller')
@prefix('/movies')
export default class ImprovementController {
  @request('patch', '/poster')
  @summary('add poster to ali oss')
  @body({
    id: movieProperties._id
  })
  async patchPoster (ctx): Promise<void> {
    const { id } = ctx.request.body
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    improvementService.patchPoster(id)
    ctx.body = { msg: 'Thanks for support' }
  }

  @request('patch', '/trailers')
  @summary('patch trailers to database')
  @responses({ 200: { description: 'trailers', schema: movieProperties.trailers } })
  @body({
    id: movieProperties._id
  })
  async patchTrailers (ctx): Promise<void> {
    const { id } = ctx.request.body
    ctx.body = await improvementService.patchTrailers(id)
  }

  @request('patch', '/backdrops')
  @summary('patch backdrops to database')
  @body({
    id: movieProperties._id
  })
  async patchBackdrops (ctx): Promise<void> {
    const { path } = ctx.request.body
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    improvementService.patchBackdrops(path)
    ctx.body = { msg: 'Thanks for support' }
  }
}
