import { body, path, query, request, responses, summary, tagsAll } from 'koa-swagger-decorator/dist'
import { commentArraySchema, commentProperties } from './swagger-definition'
import CommentServiceImpl from '../service/comment-serviece'
import { checkAdmin, checkUid, getUid } from '../core/jwt'
import Comment from '../entity/mongodb/comment'

const commentService = new CommentServiceImpl()

@tagsAll('Comment Controller')
export default class CommentController {
  @request('post', '/comments')
  @body(commentProperties)
  @summary('add a comment')
  async creatComment (ctx): Promise<void> {
    // check token valid
    getUid(ctx.auth)
    ctx.body = await commentService.creat(ctx.request.body)
  }

  @request('get', '/comments')
  @query({
    limit: { type: 'number', default: 6, description: 'limit how many comments get' },
    offset: { type: 'number', default: 0, description: 'offset when query' }
  })
  @summary('get comments list')
  @responses({ 200: { description: 'comment array', schema: commentArraySchema } })
  @checkAdmin()
  async getCommentList (ctx): Promise<void> {
    let { limit, offset } = ctx.query
    limit = limit == null ? 6 : limit
    offset = offset == null ? 0 : offset
    ctx.body = await commentService.getCommentList(limit, offset)
  }

  @request('get', '/movies/{movieId}/comments')
  @query({
    limit: { type: 'number', default: 6, description: 'limit how many comments get' },
    offset: { type: 'number', default: 0, description: 'offset when query' }
  })
  @path({
    movieId: { type: 'number', required: true, description: 'movie id' }
  })
  @summary('get comments by movie id')
  @responses({ 200: { description: 'comment array', schema: commentArraySchema } })
  async getByMovieId (ctx): Promise<void> {
    let { limit, offset } = ctx.query
    limit = limit == null ? 6 : limit
    offset = offset == null ? 0 : offset
    ctx.body = await commentService.getByMovieId(ctx.params.movieId, limit, offset)
  }

  @request('get', '/users/{userId}/comments')
  @query({
    limit: { type: 'number', default: 6, description: 'limit how many comments get' },
    offset: { type: 'number', default: 0, description: 'offset when query' }
  })
  @path({
    userId: { type: 'string', required: true, description: 'user id' }
  })
  @summary('get comments by user id')
  @responses({ 200: { description: 'comment array', schema: commentArraySchema } })
  async getByUserId (ctx): Promise<void> {
    let { limit, offset } = ctx.query
    limit = limit == null ? 6 : limit
    offset = offset == null ? 0 : offset
    ctx.body = await commentService.getByUserId(ctx.params.userId, limit, offset)
  }

  @request('patch', '/comments/{commentId}')
  @body(commentProperties)
  @path({
    commentId: { type: 'string', required: true, description: 'comment id' }
  })
  @summary('update comment')
  async updateComment (ctx): Promise<void> {
    const comment: Comment = ctx.request.body
    const commentRes = await commentService.getByCommentId(comment._id)
    checkUid(commentRes.user_id, ctx.auth)
    ctx.body = await commentService.update(comment)
  }

  @request('delete', '/comments/{commentId}')
  @path({
    commentId: { type: 'string', required: true, description: 'comment id' }
  })
  @summary('delete comment')
  async deleteComment (ctx): Promise<void> {
    const commentRes = await commentService.getByCommentId(ctx.params.commentId)
    checkUid(commentRes.user_id, ctx.auth)
    ctx.body = await commentService.delete(ctx.params.commentId)
  }
}
