import InitManager from '../../core/init'
import CommentServiceImpl from '../../service/comment-serviece'
import Comment from '../../entity/mongodb/comment'
import { ObjectID } from 'mongodb'

describe('comment service test', () => {
  let commentService: CommentServiceImpl
  let comment: Comment
  const id = ObjectID()
  const title = 'Title'
  const summary = 'Summary'
  const movieId = 123
  const userId = '321'

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  beforeAll(() => {
    return InitManager.initLoadDatabase()
  })

  beforeEach(() => {
    commentService = new CommentServiceImpl()
    comment = new Comment()
    comment._id = id
    comment.title = title
    comment.summary = summary
    comment.movie_id = movieId
    comment.user_id = userId
  })

  test('creat getByCommentId', async () => {
    await commentService.creat(comment)
    const res = await commentService.getByCommentId(comment._id)
    expect(res.title).toStrictEqual(comment.title)
    expect(res.summary).toStrictEqual(comment.summary)
  })

  test('update getByMovieId getByUserId', async () => {
    comment.title = title + 'update'
    comment.summary = summary + 'update'
    await commentService.update(comment)
    let res = await commentService.getByMovieId(comment.movie_id.toString())
    expect(res[0].title).toStrictEqual(comment.title)
    res = await commentService.getByUserId(comment.user_id)
    expect(res[0].summary).toStrictEqual(comment.summary)
  })

  test('delete', async () => {
    await commentService.delete(comment._id.toString())
    const res = await commentService.getByCommentId(comment._id)
    expect(res).toBeUndefined()
  })
})
