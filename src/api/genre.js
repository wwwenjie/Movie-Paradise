import request from '../plugins/axios'

export function getGenres (limit = 6, offset = 0) {
  return request({
    url: '/genres',
    params: {
      limit: limit,
      offset: offset
    }
  })
}
