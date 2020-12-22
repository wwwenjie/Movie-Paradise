import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export default class Comment {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  title: string

  @Column()
  summary: string

  @Column()
  rating: number

  // parent id
  @Column()
  pid: string

  @Column()
  user_id: string

  @Column()
  user_name: string

  @Column()
  user_avatar: string

  @Column()
  movie_id: number

  @Column()
  movie_title: number

  @Column()
  movie_title_en: number

  @Column()
  create_time: Date

  @Column()
  update_time: Date
}
