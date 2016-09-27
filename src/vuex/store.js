import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import users from './modules/users'
import { SHOW_TOAST, HIDE_TOAST } from './mutation-types'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

const state = {
  toast: {
    show: false,
    type: 'text',
    message: '',
    time: 2000
  }
}

const mutations = {
  [SHOW_TOAST] (state, message, type = 'text', time = 2000) {
    state.toast.show = true
    state.toast.message = message
    state.toast.type = type
    state.toast.time = time
  },
  [HIDE_TOAST] (state) {
    state.toast.show = false
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    users
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
