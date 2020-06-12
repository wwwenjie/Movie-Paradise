import request from '../plugins/axios'

export function login (user) {
  return request({
    url: '/users/tokens',
    method: 'post',
    data: user
  })
}

export function register (user) {
  return request({
    url: '/users',
    method: 'post',
    data: user
  })
}

export function getUserByUid (uid) {
  return request({
    url: `/users/${uid}`
  })
}
