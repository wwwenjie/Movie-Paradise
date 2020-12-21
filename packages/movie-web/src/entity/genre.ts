import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm'
import Movie from './movie'

@Entity()
export default class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  genre_id: number

  @Column({ unique: true })
  name: string

  @Column({ nullable: true, unique: true })
  name_en: string

  @ManyToMany(type => Movie, movie => movie.genres)
  movies: Movie[]
}
