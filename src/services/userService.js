import * as requestService from './request'

export function getUser (uid) {
  return requestService.get('/users/' + uid)
}

export function getCurrentUser (token) {
  return requestService.get('/users/auth', {}, token)
}

export function getSundry (token) {
  return requestService.get('/users/sundry', {}, token)
}

export function createUser (params) {
  return requestService.post('/users', params)
}

export function updateUser (uid, params, token) {
  return requestService.put('/users/' + uid, params, token)
}

export function updateAvatar (uid, sid, token) {
  return requestService.get('/wechat/get_user_avatar_from_wechat', {user_id: uid, media_id: sid}, token)
}

export function signIn (params) {
  return requestService.post('/sessions', params)
}
