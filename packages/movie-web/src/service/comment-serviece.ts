import Comment from '../entity/mongodb/comment'
import { ObjectID } from 'mongodb'
import { getConnection } from 'typeorm'

interface CommentService {
  creat: (comment: Comment) => Promise<void>

  update: (comment: Comment) => Promise<void>

  delete: (id: string) => Promise<void>

  getCommentList: (limit: string, offset: string) => Promise<Comment[]>

  getByMovieId: (movieId: string, limit: string, offset: string) => Promise<Comment[]>

  getByUserId: (userId: string, limit: string, offset: string) => Promise<Comment[]>

  getByCommentId: (id: string) => Promise<Comment>
}

export default class CommentServiceImpl implements CommentService {
  private readonly commentRepository = getConnection('mongodb').getMongoRepository(Comment)

  async creat (comment: Comment): Promise<void> {
    comment.create_time = new Date()
    comment.update_time = comment.create_time
    await this.commentRepository.insertOne(comment)
  }

  async update (comment: Comment): Promise<void> {
    const id = comment._id
    delete comment._id
    comment.update_time = new Date()
    await this.commentRepository.updateOne({ _id: ObjectID(id) }, {
      $set: comment
    })
  }

  async delete (id: string): Promise<void> {
    await this.commentRepository.deleteOne({
      _id: ObjectID(id)
    })
  }

  async getCommentList (limit: string = '10', offset: string = '0'): Promise<Comment[]> {
    return this.commentRepository.find({
      order: {
        update_time: 'DESC'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    })
  }

  async getByMovieId (movieId: string, limit: string = '6', offset: string = '0'): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        movie_id: parseInt(movieId)
      },
      order: {
        update_time: 'DESC'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    })
  }

  async getByUserId (userId: string, limit: string = '6', offset: string = '0'): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        user_id: userId
      },
      order: {
        update_time: 'DESC'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    })
  }

  async getByCommentId (id): Promise<Comment> {
    return this.commentRepository.findOne(ObjectID(id))
  }
}
