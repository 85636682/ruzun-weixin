import * as requestService from './request'

export function getGames () {
  return requestService.get('/games')
}

export function getGame (gid) {
  return requestService.get('/games/' + gid)
}

export function getPoints (gid) {
  return requestService.get('/games/' + gid + '/game_teams')
}
