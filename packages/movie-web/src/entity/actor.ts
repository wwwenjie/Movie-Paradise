import Movie from './movie'
import { BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Actor extends BaseEntity {
  @ManyToMany(type => Movie, movie => movie.actors)
  movies: Movie[]

  @PrimaryGeneratedColumn()
  actor_id: number

  @Index('actors_name')
  @Column()
  name: string

  @Index('actors_name_en')
  @Column({ nullable: true })
  name_en: string

  @Column({ nullable: true })
  gender: string

  @Column({ nullable: true })
  birthday: Date

  @Column({ nullable: true })
  born_place: string

  @Column({ nullable: true })
  summary: string

  @Column({ nullable: true })
  alt: string
}
