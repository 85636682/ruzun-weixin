import {
  SIGN_IN,
  SIGN_OUT,
  SET_CURRENT_USER,
  SET_AUTHORIZED
} from '../mutation-types'

const state = {
  isLogged: false,
  token: '',
  user: {}
}

const mutations = {
  [SIGN_IN] (state, user) {
    state.isLogged = true
    state.user = user
    state.token = user.token
    localStorage.setItem('ruzun_user_token', user.token)
  },
  [SIGN_OUT] (state) {
    state.isLogged = false
    state.user = {}
    localStorage.removeItem('ruzun_user_token')
  },
  [SET_CURRENT_USER] (state, user) {
    state.user = user
  },
  [SET_AUTHORIZED] (state, token) {
    state.isLogged = true
    state.token = localStorage.getItem('ruzun_user_token')
  }
}

export default {
  state,
  mutations
}
