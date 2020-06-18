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
    url: `/users/${store.state.userStore._id}`,
    method: 'patch',
    data: user
  })
}

export function deleteUser () {
  return request({
    url: `/users/${store.state.userStore._id}`,
    method: 'delete'
  })
}

export function uploadAvatar (formData) {
  return request({
    url: `/users/${store.state.userStore._id}/avatar`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
