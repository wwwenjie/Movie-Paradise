import request from '../plugins/axios'

export function getComments (movieId, limit = 6, offset = 0) {
  return request({
    url: `/movies/${movieId}/comments`,
    params: {
      limit: limit,
      offset: offset
    }
  })
}

export function createComment (comment) {
  return request({
    url: '/comments',
    data: comment,
    method: 'post'
  })
}
