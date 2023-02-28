import axios from 'axios'

export const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
const onRequestError = async (error: any) => {
  // logic when request error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onResponseError = async (error: any) => {
  if (error?.response?.status) {
    await onResponseStatus(error.response.status)
  }

  // logic when response error
}

const onResponseStatus = async (status: number) => {
  const statusMapper = new Map<number, () => void>()
    .set(401, () => {
      // redirect to login or anything you want
    })
    .set(404, () => {
      // show 404 page
    })

  const func = statusMapper.get(status)
  if (func) {
    await func()
  }
}

fetcher.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: import.meta.env.VITE_API_KEY,
    }
    return config
  },
  async (error) => {
    await onRequestError(error)
    return Promise.reject(error)
  },
)

fetcher.interceptors.response.use(
  async (response) => response.data,
  async (error) => {
    await onResponseError(error)
    return Promise.reject(error)
  },
)

export const { get, post, patch, delete: deleteFetch } = fetcher
