import * as request from 'superagent'
import MovieService from '../service/movie-service'
import { movieLogger as logger, httpLogger } from './log4js'
import InitManager from './init'
import Movie from '../entity/movie'
import OSS from '../util/oss'
import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

// todo: back up database function
class GetMovieFromAPI {
  // default: fastMode dont have backdrops, use ids to get
  // use for fastMode, multiple creating at a same time
  private static readonly concurrencyMode: boolean = true
  // use for fastMode, dont request poster and trailer
  private static readonly pureFast: boolean = true
  // store id already added, avoid unnecessary query
  private static readonly all: Set<number> = new Set()
  private static readonly task: Set<number> = new Set()
  private static readonly invalid: Set<number> = new Set()
  private static readonly msg: object = { email: 'jinwenjie@live.com', msg: 'Hello, I am getting your data through program, because there is no robots, please contact me if it bothers you, sorry for the inconvenient' }
  private static readonly url: string = 'https://api.dianying.fm/movies?ids='
  // you can input ids manually to let crawler crawl
  private static readonly initIds: number[] = []
  private static new: number = 0
  private static movieService: MovieService

  public static async go (): Promise<void> {
    await InitManager.initLoadDatabase()
    this.movieService = new MovieService()
    await this.initTask()
    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.handleTask()
    }, 15000 + Math.floor(Math.random() * 8000))
    setInterval(() => {
      console.log('=========task=========')
      console.log(this.task.size)
      console.log('=========new==========')
      console.log(this.new)
      console.log('=========all==========')
      console.log(this.all.size)
      console.log('========invalid=======')
      console.log(this.invalid.size)
    }, 15000)
    setInterval(() => {
      httpLogger.info('Get >>>>>> (msg) https://api.dianying.fm/movies')
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      request.get('https://api.dianying.fm/movies').query(this.msg)
    }, 60000)
  }

  private static async initTask (): Promise<void> {
    logger.info('========start========')
    logger.info(new Date(Date.now()))
    logger.info('crawler mode: fast')
    // it may cause task empty
    // load all movies from database
    // max memory of V8 in x64: 1.4G
    console.time('loading db')
    const totalMovies = await Movie.find({
      select: ['_id', 'recs']
    })
    console.timeEnd('loading db')
    console.time('adding all')
    totalMovies.forEach(movie => {
      this.all.add(movie._id)
    })
    console.timeEnd('adding all')
    console.time('adding invalid')
    const readStream = fs.createReadStream(path.resolve(__dirname, './invalid.log'))
    const rl = readline.createInterface(readStream)
    rl.on('line', (line) => {
      this.invalid.add(parseInt(line))
    })
    rl.on('close', () => {
      // make sure you have at least one movie in database
      // add task
      console.time('adding task')
      totalMovies.forEach(movie => {
        if (movie.recs !== undefined && movie.recs !== null) {
          movie.recs.forEach(id => {
            if (!this.all.has(id) && !this.invalid.has(id)) {
              this.task.add(id)
            }
          })
        }
      })
      console.timeEnd('adding task')
    })
    this.initIds.forEach(id => {
      this.task.add(id)
    })
  }

  private static async handleTask (): Promise<void> {
    if (this.task.size > 0) {
      const ids = []
      try {
        let counter = 0
        this.task.forEach((id) => {
          if (counter < 100) {
            ids.push(id)
            this.task.delete(id)
            counter++
          } else {
            throw new Error('ids up to 30')
          }
        })
      } catch (e) {
      }
      await this.getMovies(this.parseIds(ids))
    } else {
      console.log('waning! task is empty')
    }
  }

  private static async getMovies (query: string): Promise<void> {
    try {
      httpLogger.info(`Get >>>>>> (getMovies) ${this.url + query}`)
      console.log('========request: ', this.url + query)
      const res = await request.get(this.url + query)
      const ids: Set<string> = new Set()
      query.split('-').forEach(id => {
        ids.add(id)
      })
      res.body.forEach(movie => {
        ids.delete(movie._id)
      })
      const writerStream = fs.createWriteStream(path.resolve(__dirname, './invalid.log'), { flags: 'a+' })
      writerStream.setDefaultEncoding('utf8')
      ids.forEach(id => {
        this.invalid.add(parseInt(id))
        writerStream.write(id + '\n')
      })
      writerStream.end()
      if (res.body.length < 5) {
        await this.sleep(1000)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.handleTask()
      }
      await this.addMovieById(res.body)
    } catch (err) {
      logger.error(err)
    }
  }

  private static async addMovieById (movies): Promise<void> {
    if (this.concurrencyMode) {
      await Promise.all(movies.map(async (movie) => {
        await this.createMovie(movie)
        // add recs movies to task
        if (movie.recs !== undefined && movie.recs !== null) {
          movie.recs.forEach(id => {
            if (!this.all.has(id)) {
              this.task.add(id)
            }
          })
        }
      }))
    } else {
      for (const movie of movies) {
        await this.sleep(1000)
        await this.createMovie(movie)
        // add recs movies to task
        if (movie.recs !== undefined && movie.recs !== null) {
          movie.recs.forEach(id => {
            if (!this.all.has(id)) {
              this.task.add(id)
            }
          })
        }
      }
    }
  }

  private static async createMovie (movie: Movie): Promise<void> {
    if (!this.pureFast) {
      await this.getTrailer(movie)
    }
    // create movie
    try {
      console.log('========creating: ', movie.title)
      // if existed create will throw error
      await this.movieService.create(movie)
      this.new++
      console.log('========finished: ', movie.title_en)
      logger.info(`created: ${movie.title} ${movie._id}`)
      // add this movie to all
      this.all.add(movie._id)
      // remove this movie form task
      this.task.delete(movie._id)
      // back up poster
      if (!this.pureFast) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        OSS.putPoster(movie._id)
      }
    } catch (err) {
      logger.error(err)
      logger.error(movie)
      console.log(err)
      console.log(movie)
    }
  }

  private static async getTrailer (movie: Movie): Promise<void> {
    try {
      httpLogger.info(`Get >>>>>> (getTrailer) https://api.dianying.fm/trailers/${movie._id}`)
      const res = await request.get(`https://api.dianying.fm/trailers/${movie._id}`)
      movie.trailers = res.body
    } catch (err) {
      logger.error('trailer:', err)
    }
  }

  private static parseIds (ids: number[]): string {
    // remove id already exist in all
    const filterId = ids.filter(id => {
      return !this.all.has(id)
    })
    // format
    return filterId.join('-')
  }

  private static async sleep (ms): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
GetMovieFromAPI.go()
