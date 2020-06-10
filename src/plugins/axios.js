// inspired by vue-element-admin
// https://panjiachen.github.io/vue-element-admin-site/guide/essentials/server.html#front-end-request-flow

import axios from 'axios'
import Message from '../utils/message'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 8000,
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
      if (JSON.parse(localStorage.getItem('vuex')).token) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('vuex')).token
      }
    }
    return config
  },
  error => {
    Message.error('Unknown Error Occurred')
    console.log(error)
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
    if (error.response.data.message) {
      Message.error(error.response.data.message)
    } else {
      Message.error('Unknown Error Occurred')
      console.log(error)
    }
    return Promise.reject(error)
  }
)

export default service
