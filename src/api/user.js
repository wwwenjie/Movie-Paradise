import request from '../plugins/axios'
import store from '../store'

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

export function updateUser (user) {
  return request({
    url: `/users/${store.state.userStore.uid}`,
    method: 'patch',
    data: user
  })
}
