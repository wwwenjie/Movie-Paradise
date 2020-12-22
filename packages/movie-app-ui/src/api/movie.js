import request from '../plugins/axios'
import store from '../store'
import { deepCopy } from '../utils'
import countryPackage from '../locales/country-code.json'

// load genre translate, avoid forEach every time
const genreObject = {}
store.state.genreStore.forEach(genre => {
  genreObject[genre.name] = genre.name_en
})

// load origin translate
const regionObject = {}
countryPackage.forEach(item => {
  regionObject[item.cn] = item.en
})

function movieInterceptor (movies) {
  return translate(movies)
}

// extra translate for en-US
function translate (movies) {
  const tempMovies = deepCopy(movies)
  if (store.state.locale === 'en-US') {
    if (Array.isArray(tempMovies)) {
      tempMovies.map(movie => {
        handleMovieTranslate(movie)
      })
    } else {
      handleMovieTranslate(tempMovies)
    }
  }
  return tempMovies
}

// note: it will overwrite chinese to english
function handleMovieTranslate (movie) {
  // title
  movie.title = movie.title_en ? movie.title_en : movie.title
  // genre
  if (movie.info.genre) {
    movie.info.genre = movie.info.genre.split('/', 2).map(genreName => {
      return genreObject[genreName]
    }).join('/')
  }
  // origin
  if (movie.info.region) {
    movie.info.region = movie.info.region.split('/', 2).map(regionName => {
      // not sure if the package include all the country
      return regionObject[regionName] || regionName
    }).join('/')
  }
}

function setCache (key, movies) {
  if (!store.state.movieCache[key]) {
    store.commit('SET_MOVIE_CACHE', { [key]: store.state.movieCache[key] = movies })
  } else {
    store.commit('SET_MOVIE_CACHE', { [key]: store.state.movieCache[key].concat(movies) })
  }
  store.commit('SET_CACHE_DATE', new Date().getTime())
}

export async function getMovieByPath (path) {
  for (const movies of Object.values(store.state.movieCache)) {
    // filter today
    if (!Array.isArray(movies)) continue
    // use for loop to make sure return will exit function
    for (const movie of movies) {
      if (movie.path === path) {
        return movieInterceptor(movie)
      }
    }
  }
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
  if (store.state.movieCache[genre] && store.state.movieCache[genre].length > limit + offset) {
    return movieInterceptor(store.state.movieCache[genre].slice(offset, offset + limit))
  } else {
    const movies = await request({
      url: '/movies',
      params: {
        genre: genre,
        limit: limit,
        offset: offset
      }
    })
    setCache(genre, movies)
    return movieInterceptor(movies)
  }
}

export async function getTodayMovie () {
  if (store.state.movieCache.today) {
    return movieInterceptor(store.state.movieCache.today)
  }
  const movie = await request({
    url: '/movies/today'
  })
  setCache('today', movie)
  return movieInterceptor(movie)
}

export async function getMovieByType (type, limit = 8, offset = 0) {
  if (store.state.movieCache[type] && store.state.movieCache[type].length > limit + offset) {
    return movieInterceptor(store.state.movieCache[type].slice(offset, offset + limit))
  } else {
    const movies = await request({
      url: `/movies/${type}`,
      params: {
        limit: limit,
        offset: offset
      }
    })
    setCache(type, movies)
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
