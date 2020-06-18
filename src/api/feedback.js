import request from '../plugins/axios'

export function addFeedback (feedback) {
  return request({
    url: '/feedback',
    method: 'post',
    data: feedback
  })
}
