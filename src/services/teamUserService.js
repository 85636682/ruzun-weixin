import * as requestService from './request'

export function createTeamUser (params, token) {
  return requestService.post('/team_users', params, token)
}

export function updateMember (params, token) {
  return requestService.put('/team_users/update_member', params, token)
}

export function deleteTeamUser (params, token) {
  return requestService.del('/team_users/quit', params, token)
}

export function kickUser (params, token) {
  return requestService.del('/team_users/kick', params, token)
}
