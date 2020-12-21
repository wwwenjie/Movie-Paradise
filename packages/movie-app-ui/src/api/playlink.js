import request from '../plugins/axios'

export function getPlayLinks (movieId) {
  return request({
    url: `/playlinks/${movieId}`
  })
}
