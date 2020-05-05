import request from '../plugins/axios'

export function getMovie (id) {
  return request({
    url: `/movies/${id}`,
    method: 'get'
  })
}

export function getMovieByGenre (genre = 'newest', limit = 10) {
  return request({
    url: `/movies?genre=${genre}&limit=${limit}`,
    method: 'get'
  })
}
