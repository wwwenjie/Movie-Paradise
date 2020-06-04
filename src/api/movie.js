import request from '../plugins/axios'
import store from '../store'

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

export async function getMovieByGenre (genre, limit = 8, offset = 0) {
  if (store.state.movieCache[genre] && offset === 0) {
    return store.state.movieCache[genre]
  } else {
    const movies = await request({
      url: '/movies',
      params: {
        genre: genre,
        limit: limit,
        offset: offset
      }
    })
    if (offset === 0) {
      store.commit('SET_MOVIE_CACHE', { [genre]: movies })
    }
    return movies
  }
}

export async function getMovieByType (type, limit = 8, offset = 0) {
  if (store.state.movieCache[type] && offset === 0) {
    return store.state.movieCache[type]
  } else {
    const movies = await request({
      url: `/movies/${type}`,
      params: {
        limit: limit,
        offset: offset
      }
    })
    if (offset === 0) {
      store.commit('SET_MOVIE_CACHE', { [type]: movies })
      store.commit('SET_CACHE_DATE', new Date().getTime())
    }
    return movies
  }
}

export function searchByTitle (keyword) {
  return request({
    url: '/movies',
    params: {
      keyword: keyword
    }
  })
}
