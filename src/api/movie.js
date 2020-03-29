import request from '../plugins/axios'

export function getMovie (id) {
  return request({
    url: `/movies/${id}`,
    method: 'get'
  })
}

export function delMovie (id) {
  return request({
    url: `/movies/${id}`,
    method: 'delete'
  })
}
