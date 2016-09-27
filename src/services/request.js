import qs from 'query-string'
import config from '../configs'
import 'whatwg-fetch'

const urlPrefix = config.domain + config.apiPath

function filterJSON (res) {
  return res.json()
}

function filterStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else if (res.status === 401) {
    let error = new Error('登录超时，重新登录！')
    error.res = res
    error.type = 'Authorization'
    throw error
  } else {
    let error = new Error(res.statusText)
    error.res = res
    error.type = 'http'
    throw error
  }
}

function authorization (key, token) {
  if (token) {
    return key + ' ' + token
  }
  return key
}

export function get (url, params, token = '') {
  url = urlPrefix + url
  if (params) {
    url += '?' + qs.stringify(params)
  }
  /*
  if (__DEV__) {
    console.info('GET', url)
    console.info('Params', params)
  }
  */
  return fetch(url, { headers: { 'Authorization': authorization('User', token) } }).then(filterStatus).then(filterJSON)
}

function _post (url, method, body = {}, token = '') {
  url = urlPrefix + url
  /*
  if (__DEV__) {
    console.info('POST:', url)
    console.info('Body', body)
  }
  */
  return fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authorization('User', token)
    },
    body: JSON.stringify(body)
  })
  .then(filterStatus)
  .then(filterJSON)
}

export function post (url, body, token = '') {
  return _post(url, 'POST', body, token)
}

export function put (url, body, token = '') {
  return _post(url, 'PUT', body, token)
}

export function patch (url, body, token = '') {
  return _post(url, 'PATCH', body, token)
}

export function del (url, body, token = '') {
  return _post(url, 'DELETE', body, token)
}
