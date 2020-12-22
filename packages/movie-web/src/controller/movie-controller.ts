import MovieServiceImpl from '../service/movie-service'
import { body, path, prefix, query, request, responses, summary, tagsAll } from 'koa-swagger-decorator/dist'
import { movieSchema, movieArraySchema, pagingQuery, getMoviesQuery, movieProperties } from './swagger-definition'
import { time } from '../util'
import { checkAdmin } from '../core/jwt'

const movieService = new MovieServiceImpl()

@tagsAll('Movie Controller')
@prefix('/movies')
export default class MovieController {
  @request('get', '')
  @summary('get movies by actor / genre / ids / keyword (array)')
  @query(getMoviesQuery)
  @responses({ 200: { description: 'query movies array', schema: movieArraySchema } })
  @time()
  async getMovies (ctx): Promise<void> {
    // todo: more elegant way to switch
    const { ids, genre, actor, limit, offset, keyword } = ctx.query
    if (keyword !== undefined) {
      ctx.body = await movieService.search(keyword)
      return
    }
    if (ids !== undefined) {
      ctx.body = await movieService.getByIds(ids)
      return
    }
    if (actor !== undefined) {
      ctx.body = await movieService.getByActor(actor, limit, offset)
      return
    }
    if (genre !== undefined) {
      ctx.body = await movieService.getByGenre(genre, limit, offset)
    }
  }

  @request('put', '')
  @body(movieProperties)
  @summary('update a movie (fully)')
  @checkAdmin()
  @time()
  async updateMovie (ctx): Promise<void> {
    await movieService.update(ctx.request.body)
    ctx.body = { code: 200, msg: 'success' }
  }

  @request('get', '/today')
  @summary('get today movie (high score, new movie)')
  @responses({ 200: { description: 'today movie', schema: movieSchema } })
  @time()
  async getToday (ctx): Promise<void> {
    ctx.body = await movieService.getToday()
  }

  @request('get', '/newest')
  @summary('get newest movie (newest release based on Date.now())')
  @query(pagingQuery)
  @responses({ 200: { description: 'new movies array', schema: movieArraySchema } })
  @time()
  async getNewest (ctx): Promise<void> {
    const { limit, offset } = ctx.query
    ctx.body = await movieService.getNewest(limit, offset)
  }

  @request('get', '/coming')
  @summary('get coming movies (upcoming movies based on Date.now())')
  @query(pagingQuery)
  @responses({ 200: { description: 'coming movies array', schema: movieArraySchema } })
  @time()
  async getComing (ctx): Promise<void> {
    const { limit, offset } = ctx.query
    ctx.body = await movieService.getComing(limit, offset)
  }

  @request('get', '/{path}')
  @summary('get a movie by path')
  @path({
    path: { type: 'string', required: true, description: 'movie path' }
  })
  @responses({ 200: { description: 'a movie match the path', schema: movieSchema } })
  @time()
  async getMovieByPath (ctx): Promise<void> {
    ctx.body = await movieService.getByPath(ctx.params.path)
  }
}
