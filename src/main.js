'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import lazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import routerMap from './routers'
import vueConfig from './vue-config'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import WxApi from './wx-api'

Vue.config.debug = true

const configs = {
  API: process.env.NODE_ENV === 'production' ? 'http://ruzun.jiancan.me/api/v1' : 'http://ruzun.jiancan.me/api/v1'
}

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(vueConfig, configs)
Vue.use(lazyload, {
  error: '',
  loading: '',
  try: 3
})

let router = new VueRouter({})

router.beforeEach(transition => {
  if (transition.to.auth) {
    // 对用户身份进行验证...
    let token = localStorage.getItem('ruzun_user_token')
    if (!token || token === null) {
      transition.redirect('/signin')
    }
  }
  FastClick.attach(document.body)
  transition.next()
})

let main = Vue.extend(require('./main.vue'))

routerMap(router)

sync(store, router)

WxApi.init(Vue)

router.start(main, '#app')
