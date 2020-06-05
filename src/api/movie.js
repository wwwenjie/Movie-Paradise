import request from '../plugins/axios'
import store from '../store'
import { deepCopy } from '../utils'

// avoid for loop when find name_en
let genreObject = {}
store.state.genreStore.forEach(genre => {
  genreObject[genre.name] = genre.name_en
})

function movieInterceptor (movies) {
  let result = translate(movies)
  return result
}

function translate (movies) {
  const tempMovies = deepCopy(movies)
  if (store.state.locale === 'en-US') {
    if (Array.isArray(tempMovies)) {
      tempMovies.map(movie => {
        handleTitleGenre(movie)
      })
    } else {
      handleTitleGenre(tempMovies)
    }
  }
  return tempMovies
}

function handleTitleGenre (movie) {
  movie.title = movie.title_en ? movie.title_en : movie.title
  if (movie.info.genre) {
    movie.info.genre = movie.info.genre.split('/', 2).map(genreName => {
      return genreObject[genreName]
    }).join('/')
  }
}

export async function getMovieByPath (path) {
  const movie = await request({
    url: `/movies/${path}`
  })
  return movieInterceptor(movie)
}

export async function getMovieByIds (ids) {
  const movies = await request({
    url: '/movies',
    params: {
      ids: ids.join('-')
    }
  })
  return movieInterceptor(movies)
}

export async function getMovieByGenre (genre, limit = 8, offset = 0) {
  if (store.state.movieCache[genre] && offset === 0) {
    return movieInterceptor(store.state.movieCache[genre])
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
    return movieInterceptor(movies)
  }
}

export async function getMovieByType (type, limit = 8, offset = 0) {
  if (store.state.movieCache[type] && offset === 0) {
    return movieInterceptor(store.state.movieCache[type])
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
    return movieInterceptor(movies)
  }
}

export async function searchByTitle (keyword) {
  const movies = await request({
    url: '/movies',
    params: {
      keyword: keyword
    }
  })
  return movieInterceptor(movies)
}
