// inspired by vue-element-admin
// https://panjiachen.github.io/vue-element-admin-site/guide/essentials/server.html#front-end-request-flow

import axios from 'axios'
import Message from '../utils/message'
import store from '../store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 12000,
  headers: {
    'Content-type': 'application/json'
  },
  // default method
  method: 'GET'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // add auth
    if (localStorage.getItem('vuex')) {
      if (store.state.token) {
        config.headers.Authorization = 'Bearer ' + store.state.token
      }
    }
    return config
  },
  error => {
    store.commit('CLOSE_LOADING')
    Message.error(error.message)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  // custom error will be handled here
  error => {
    store.commit('CLOSE_LOADING')
    if (error.response) {
      Message.error(error.response.data.message)
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
