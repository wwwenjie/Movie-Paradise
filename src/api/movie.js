import request from '../plugins/axios'

export function getMovieByPath (path) {
  return request({
    url: `/movies/${path}`
  })
}

export function getMovieByIds (ids) {
  return request({
    url: '/movies',
    params: {
      ids: ids.join('-')
    }
  })
}

export function getMovieByGenre (genre, limit = 8, offset = 0) {
  return request({
    url: '/movies',
    params: {
      genre: genre,
      limit: limit,
      offset: offset
    }
  })
}

export function getMovieByType (type, limit = 8, offset = 0) {
  return request({
    url: `/movies/${type}`,
    params: {
      limit: limit,
      offset: offset
    }
  })
}

export function searchByTitle (keyword) {
  return request({
    url: '/movies',
    params: {
      keyword: keyword
    }
  })
}
