import * as requestService from './request'

export function getTeams () {
  return requestService.get('/teams')
}

export function getTeam (tid) {
  return requestService.get('/teams/' + tid)
}

export function createTeam (params, token) {
  return requestService.post('/teams', params, token)
}

export function updateTeam (tid, params, token) {
  return requestService.put('/teams/' + tid, params, token)
}

export function updateLogo (tid, sid, token) {
  return requestService.get('/wechat/get_team_logo_from_wechat', {team_id: tid, media_id: sid}, token)
}

export function deleteTeam (tid, token) {
  return requestService.del('/teams/' + tid, {}, token)
}

export function getTeamPlayeds (tid) {
  return requestService.get('/teams/' + tid + '/playeds')
}
