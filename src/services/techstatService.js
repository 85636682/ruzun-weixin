import * as requestService from './request'

export function getTechstats (pid) {
  return requestService.get('/playeds/' + pid + '/techstats')
}
