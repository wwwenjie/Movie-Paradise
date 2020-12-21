import { prefix, request, responses, summary, tagsAll } from 'koa-swagger-decorator/dist'
import { genreArraySchema } from './swagger-definition'
import Genre from '../entity/genre'

@tagsAll('Genre Controller')
@prefix('/genres')
export default class GenreController {
  @request('get', '')
  @summary('get genres')
  @responses({ 200: { description: 'genre array', schema: genreArraySchema } })
  async getGenres (ctx): Promise<void> {
    ctx.body = await Genre.find({
      select: ['name', 'name_en']
    })
  }
}
