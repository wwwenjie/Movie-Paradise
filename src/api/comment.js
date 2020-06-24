import request from '../plugins/axios'

export function getCommentByMovieId (movieId, limit = 6, offset = 0) {
  return request({
    url: `/movies/${movieId}/comments`,
    params: {
      limit: limit,
      offset: offset
    }
  })
}

export function getCommentByUserId (userId, limit = 6, offset = 0) {
  return request({
    url: `/users/${userId}/comments`,
    params: {
      limit: limit,
      offset: offset
    }
  })
}

export function createComment (comment) {
  return request({
    url: '/comments',
    data: comment,
    method: 'post'
  })
}

export function updateComment (comment) {
  return request({
    url: `/comments/${comment._id}`,
    data: comment,
    method: 'patch'
  })
}

export function deleteComment (commentId) {
  return request({
    url: `/comments/${commentId}`,
    method: 'delete'
  })
}
