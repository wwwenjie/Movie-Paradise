import PlayLink from '../entity/mongodb/play-link'
import { getConnection } from 'typeorm'
import * as request from 'superagent'
import { time } from '../util'

interface PlayLinkService {
  get: (movieId: string) => Promise<PlayLink[]>
  putPlayLink: (movieId: string) => Promise<PlayLink[]>
  // getOnline: () => Promise<PlayLink[]>
  // getDownload: () => Promise<PlayLink[]>
}

export default class PlayLinkServiceImpl implements PlayLinkService {
  private readonly playLinkRepository = getConnection('mongodb').getMongoRepository(PlayLink)

  async get (movieId: string): Promise<PlayLink[]> {
    const links = await this.playLinkRepository.find({
      douban_id: parseInt(movieId)
    })
    if (links.length === 0) {
      return await this.putPlayLink(movieId)
    } else {
      return links
    }
  }

  @time()
  async putPlayLink (movieId: string): Promise<PlayLink[]> {
    const api = `https://api.dianying.fm/playlinks/${movieId}/`
    // concurrent request
    const promiseAll = await Promise.all([
      request.get(api + 'online'),
      request.get(api + 'download')
    ])
    const online: PlayLink[] = promiseAll[0].body
    const download: PlayLink[] = promiseAll[1].body
    if (online.concat(download).length !== 0) {
      await this.playLinkRepository.insert(online.concat(download))
    }
    return online.concat(download)
  }
}
