import * as requestService from './request'

export function getPlayeds (gid) {
  return requestService.get('/games/' + gid + '/playeds')
}
