import { path, prefix, request, summary, tagsAll } from 'koa-swagger-decorator/dist'
import PlayLinkServiceImpl from '../service/play-link-Service'

const playLinkService = new PlayLinkServiceImpl()

@tagsAll('Play Link Controller')
@prefix('/playlinks')
export default class PlayLinkController {
  @request('get', '/{movieId}')
  @summary('get play links')
  @path({
    movieId: { type: 'number', required: true, description: 'movie id' }
  })
  async getGenres (ctx): Promise<void> {
    ctx.body = await playLinkService.get(ctx.params.movieId)
  }
}
