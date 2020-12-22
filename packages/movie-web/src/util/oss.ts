import * as Oss from 'ali-oss'
import * as request from 'superagent'
import { ossLogger, httpLogger } from '../core/log4js'
import config from '../config'
import E from '../error/ErrorEnum'

export default class OSS {
  private static readonly client = new Oss(config.ossConfig)
  private static readonly url: string = 'https://img.dianying.fm/poster/'

  static async putPoster (id: number): Promise<any> {
    try {
      httpLogger.info(`Get >>>>>> (getPoster) ${this.url + id.toString()}`)
      const res = await request.get(this.url + id.toString())
      // fs.writeFile(`${this.localPath}${id}`, res.body, function (err) {
      //   if (err !== null) {
      //     logger.error('put local error:', id)
      //   } else {
      //     logger.info('put local success:', id)
      //   }
      // })
      httpLogger.info(`Post >>>>>> (postPoster) http://xxx.alicloud.com/poster/${id}`)
      const ossRes = await this.client.put(`poster/${id}`, res.body, {
        headers: {
          'Content-Type': 'image/jpeg'
        }
      })
      ossLogger.info('put poster success:', ossRes.url)
    } catch (err) {
      ossLogger.error('error: ', err)
      throw E.OSSPutError
    }
  }

  static async putAvatar (fileName: string, localPath: string): Promise<any> {
    try {
      httpLogger.info(`Post >>>>>> (postAvatar) http://xxx.alicloud.com/poster/${fileName}`)
      const ossRes = await this.client.put(`avatar/${fileName}`, localPath)
      ossLogger.info('put avatar success:', ossRes.url)
      return ossRes.url
    } catch (err) {
      ossLogger.error('error: ', err)
      throw E.OSSPutError
    }
  }
}
