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

export function patchTrailers (id) {
  return request({
    method: 'PATCH',
    url: '/movies/trailers',
    data: {
      id: id
    }
  })
}

export function patchBackdrops (path) {
  return request({
    method: 'PATCH',
    url: '/movies/backdrops',
    data: {
      path: path
    }
  })
}

export function headPoster (id) {
  // it is expected 404 error, so dont use request, use pure axios
  return axios.head(`${Config.fallbackUrl[0]}${id}`)
}
