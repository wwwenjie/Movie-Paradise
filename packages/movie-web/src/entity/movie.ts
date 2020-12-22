import Genre from './genre'
import Actor from './actor'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export default class Movie extends BaseEntity {
  @PrimaryColumn()
  _id: number

  @Column({ nullable: true })
  imdb_id: string

  @Index('movie_title')
  @Column()
  title: string

  @Index('movie_title_en')
  @Column({ nullable: true })
  title_en: string

  @Column()
  year: number

  // Data redundancy for index
  @Index('movie_release')
  @Column()
  release: Date

  @Column()
  poster: string

  @Index('movie_path')
  @Column({ unique: true })
  path: string

  @Column({ type: 'json' })
  info: {
    director: string
    writer: string
    // Data redundancy for simplify operation
    actors: string
    // Data redundancy for simplify operation
    genre: string
    region: string
    language: string
    release: string
    duration: string
    alias: string
    summary: string
  }

  @Column({ nullable: true, type: 'json' })
  rating: {
    tags: string
    douban_score: string
    douban_votes: number
    imdb_score: string
    imdb_votes: number
  }

  @Column({ nullable: true, type: 'json' })
  recs: number[]

  @Column({ nullable: true, type: 'json' })
  trailers: Array<{
    _id: string
    'm': number
    'name': string
    'play_url': string
    'cover_url': string
  }>

  @Column({ nullable: true, type: 'json' })
  backdrops: Array<{
    aspect_ratio: number
    file_path: string
    height: number
    iso_639_1: string
    vote_average: number
    vote_count: number
    width: number
  }>

  @CreateDateColumn()
  create_time: Date

  @UpdateDateColumn()
  update_time: Date

  @ManyToMany(type => Genre, genre => genre.genre_id, { cascade: true })
  @JoinTable({
    name: 'movie_genre',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: '_id'
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'genre_id'
    }
  })
  genres: Genre[]

  @ManyToMany(type => Actor, actor => actor.actor_id, { cascade: true })
  @JoinTable({
    name: 'movie_actor',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: '_id'
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'actor_id'
    }
  })
  actors: Actor[]
}
