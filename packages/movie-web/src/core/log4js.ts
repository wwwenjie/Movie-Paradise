import { configure, getLogger } from 'log4js'
configure({
  appenders: {
    Default: { type: 'file', filename: 'log/app.log' },
    Console: { type: 'console' },
    Movie: { type: 'file', filename: 'log/movie.log' },
    OSS: { type: 'file', filename: 'log/oss.log' },
    HTTP: { type: 'file', filename: 'log/http.log' },
    Improvement: { type: 'file', filename: 'log/improvement.log' }
  },
  categories: {
    default: { appenders: ['Default', 'Console'], level: 'info' },
    Movie: { appenders: ['Movie'], level: 'info' },
    OSS: { appenders: ['OSS'], level: 'info' },
    HTTP: { appenders: ['HTTP'], level: 'info' },
    Improvement: { appenders: ['Improvement'], level: 'info' }
  }
})
export default getLogger('default')
export const movieLogger = getLogger('Movie')
export const ossLogger = getLogger('OSS')
export const httpLogger = getLogger('HTTP')
export const improvementLogger = getLogger('Improvement')
