import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export default class PlayLink {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  douban_id: number

  @Column()
  like_count: number

  @Column()
  meta: {
    date: Date
    du: string
    du_s: number
    thid: string
    pay: boolean
    pv: number
    length: number
    ext: string
  }

  @Column()
  score: number

  @Column()
  site: string

  @Column()
  title: string

  @Column()
  type: string

  @Column()
  url: string
}
