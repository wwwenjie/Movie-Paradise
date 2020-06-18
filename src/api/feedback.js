import request from '../plugins/axios'

export function addFeedback (feedback) {
  return request({
    method: 'post',
    url: '/feedback',
    data: feedback
  })
}
