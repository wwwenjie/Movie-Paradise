import Movie from '../entity/movie'
import Genre from '../entity/genre'
import Actor from '../entity/actor'
import { LessThan, Like, MoreThan } from 'typeorm'
import { getRandomItemFromArray, notNull } from '../util'

interface MovieService {
  getToday: () => Promise<Movie>

  getNewest: (limit: string, offset: string) => Promise<Movie[]>

  getComing: (limit: string, offset: string) => Promise<Movie[]>

  search: (keyword: string) => Promise<Movie[]>

  getByPath: (path: string) => Promise<Movie>

  getByIds: (ids: string) => Promise<Movie[]>

  getByGenre: (genre: string, limit: string, offset: string) => Promise<Movie[]>

  getByActor: (actor: string, limit: string, offset: string) => Promise<Movie[]>

  update: (movie: Movie) => Promise<void>

  create: (movie: Movie) => Promise<void>

  handelGenre: (movie: Movie) => Promise<Movie>

  handelActor: (movie: Movie) => Promise<Movie>
}

export default class MovieServiceImpl implements MovieService {
  // return a high score, new movie, front end will store it to make sure it wont change in one day
  async getToday (): Promise<Movie> {
    const movies = await Movie.find({
      where: {
        release: LessThan(new Date(Date.now()))
      },
      order: {
        release: 'DESC'
      },
      take: 1000
    })
    const qualifiedMovie = movies.filter(movie => {
      if (!notNull(movie.rating)) {
        return false
      }
      if (!notNull(movie.trailers) || movie.trailers.length === 0) {
        return false
      }
      if (notNull(movie.rating.douban_score)) {
        return parseFloat(movie.rating.douban_score) > 8.0
      } else if (notNull(movie.rating.imdb_score)) {
        return parseFloat(movie.rating.imdb_score) > 8.0
      } else {
        return false
      }
    })
    return getRandomItemFromArray(qualifiedMovie, 1)[0]
  }

  async getNewest (limit: string = '8', offset: string = '0'): Promise<Movie[]> {
    if (offset === '0') {
      return getRandomItemFromArray(await Movie.find({
        where: {
          release: LessThan(new Date(Date.now()))
        },
        order: {
          release: 'DESC'
        },
        take: parseInt(limit) * 3
      }), parseInt(limit))
    } else {
      return Movie.find({
        where: {
          release: LessThan(new Date(Date.now()))
        },
        order: {
          release: 'DESC'
        },
        take: parseInt(limit),
        skip: parseInt(offset)
      })
    }
  }

  async getComing (limit: string = '8', offset: string = '0'): Promise<Movie[]> {
    return Movie.find({
      where: {
        release: MoreThan(new Date(Date.now()))
      },
      order: {
        release: 'ASC'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    })
  }

  async search (keyword: string): Promise<Movie[]> {
    // check if keyword is chinese
    if (/[\u4e00-\u9fa5]/.test(keyword)) {
      return Movie.find({
        where: {
          title: Like(`%${keyword}%`)
        },
        // only take 20 to make user search more clearly
        take: 20
      })
    } else {
      return Movie.find({
        where: {
          // need mysql 8 to optimize speed, if use mysql 5, separate the keyword to query
          title_en: Like(`%${keyword}%`)
        },
        take: 12
      })
    }
  }

  async getByPath (path: string): Promise<Movie> {
    return Movie.findOne({
      path: path
    })
  }

  async getByIds (ids: string): Promise<Movie[]> {
    const idsArray = ids.split('-').map(Number)
    return Movie.findByIds(idsArray)
  }

  async getByActor (actor: string, limit: string = '8', offset: string = '0'): Promise<Movie[]> {
    const query = await Movie.query('SELECT movie_id as id FROM movie_actor WHERE ' +
      'actor_id = (SELECT actor_id FROM actor WHERE name = ?) LIMIT ? OFFSET ?',
    [actor, parseInt(limit), parseInt(offset)])
    if (query.length === 0) {
      return []
    }
    const ids = query.map(row => {
      return row.id
    })
    return Movie.createQueryBuilder()
      .whereInIds(ids)
      .getMany()
  }

  async getByGenre (genre: string, limit: string = '8', offset: string = '0'): Promise<Movie[]> {
    // security
    // if (offset !== '0') {
    const query = await Movie.query('SELECT movie_id as id FROM movie_genre WHERE ' +
        'genre_id = (SELECT genre_id FROM genre WHERE name = ?) ORDER BY movie_id DESC LIMIT ? OFFSET ?',
    [genre, parseInt(limit), parseInt(offset)])
    // } else {
    //   query = await Movie.query('SELECT movie_id as id FROM movie_genre WHERE ' +
    //     'genre_id = (SELECT genre_id FROM genre WHERE name = ?) ORDER BY movie_id DESC LIMIT ?',
    //   [genre, parseInt('1000')])
    //   query = getRandomItemFromArray(query, parseInt(limit))
    // }
    const ids = query.map(row => {
      return row.id
    })
    return Movie.createQueryBuilder()
      .whereInIds(ids)
      .getMany()
  }

  async create (movie: Movie): Promise<void> {
    if (await Movie.findOne({ _id: movie._id }) !== undefined) {
      throw Error('movie existed')
    }
    await this.update(movie)
  }

  // todo: transaction
  async update (movie: Movie): Promise<void> {
    this.setValues(movie)
    movie = await this.handelGenre(movie)
    movie = await this.handelActor(movie)
    await Movie.save(movie)
  }

  // Duplicated code
  async handelGenre (movie: Movie): Promise<Movie> {
    if (movie.info.genre === undefined) {
      return movie
    }
    const genreValues = movie.info.genre.split('/')
    const genreEntity = []
    await Promise.all(genreValues.map(async genreName => {
      const genre = await Genre.findOne({
        name: genreName
      })
      if (genre === undefined) {
        const res = await Genre.insert({
          name: genreName
        })
        genreEntity.push(...res.identifiers)
      } else {
        genreEntity.push(genre)
      }
    }))
    movie.genres = genreEntity
    return movie
  }

  async handelActor (movie: Movie): Promise<Movie> {
    if (movie.info.actors === undefined) {
      return movie
    }
    const actorValues = Array.from(new Set(movie.info.actors.split('/')))
    const actorEntity = []
    await Promise.all(actorValues.map(async actorName => {
      const actor = await Actor.findOne({
        name: actorName
      })
      if (actor === undefined) {
        const res = await Actor.insert({
          name: actorName
        })
        actorEntity.push(...res.identifiers)
      } else {
        actorEntity.push(actor)
      }
    }))
    movie.actors = actorEntity
    return movie
  }

  setValues (movie: Movie): void {
    // change poster
    movie.poster = 'https://img.dianying.fm/poster/' + movie._id.toString()
    const date = RegExp(/\d{4}-\d{2}-\d{2}/)
    const year = RegExp(/\d{4}/)
    if (movie.year == null && movie.info.release == null) {
      movie.year = 0
      movie.release = new Date(movie.year)
    } else if (movie.info.release != null) {
      // add movie.release
      if (date.test(movie.info.release)) {
        movie.release = new Date(movie.info.release.match(date)[0])
      } else {
        movie.release = new Date(movie.info.release.match(year)[0])
      }
      // add year
      movie.year = parseInt(movie.info.release.match(year)[0])
    } else if (movie.year != null) {
      movie.release = new Date(movie.year)
    }
  }
}
