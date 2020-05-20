import request from '../plugins/axios'
import axios from 'axios'
import Config from '../config'

export function patchPoster (id) {
  return request({
    method: 'PATCH',
    url: '/movies/poster',
    data: {
      id: id
    }
  })
}

export function patchTrailers (id, trailers) {
  return request({
    method: 'PATCH',
    url: '/movies/trailers',
    data: {
      id: id,
      trailers: trailers
    }
  })
}

export function patchBackdrops (id, backdrops) {
  return request({
    method: 'PATCH',
    url: '/movies/backdrops',
    data: {
      id: id,
      backdrops: backdrops
    }
  })
}

export function headPoster (id) {
  // it is expected 404 error, so dont use request, use pure axios
  return axios.head(`${Config.fallbackUrl[0]}${id}.jfif`)
}

export function getTrailers (id) {
  return request({
    url: `https://api.dianying.fm/trailers/${id}`
  })
}

export function getBackdrops (path) {
  return request({
    url: `https://api.dianying.fm/movies/${path}`
  })
}
