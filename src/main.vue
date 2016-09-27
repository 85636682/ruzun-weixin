<template>
  <div id="main">
    <router-view></router-view>
    <toast :show.sync="showToast" :type="toast.type">{{toast.message}}</toast>
  </div>
</template>
<script>
  import store from './vuex/store'
  import Toast from 'vux/dist/components/toast'
  import { catchError, showToast, hideToast, setCurrentUser, setAuthorized } from './vuex/actions'
  import * as userService from './services/userService'

  export default {
    store,
    vuex: {
      getters: {
        toast: state => state.toast,
        isLogged: state => state.users.isLogged
      },
      actions: {
        catchError,
        showToast,
        hideToast,
        setCurrentUser,
        setAuthorized
      }
    },
    computed: {
      showToast: {
        get () {
          return this.toast.show
        },
        set (val) {
          if (!val) {
            this.hideToast()
          }
        }
      }
    },
    components: {
      Toast
    },
    created () {
      if (!this.isLogged) {
        let token = localStorage.getItem('ruzun_user_token')
        if (token !== null) {
          this.setAuthorized(token)
          userService.getCurrentUser(token)
          .then((responseJson) => {
            this.setCurrentUser(responseJson.user)
          })
          .catch((error) => {
            this.catchError(error)
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '~vux/dist/vux.css';
  .x-header {
    background-color:#23a05a;
  }
  .x-header .x-header-title a,.x-header .x-header-title a:active,.x-header h1 a,.x-header h1 a:active {
    color: #fff
  }
  .x-header .x-header-left,.x-header .x-header-right {
    color: #fff
  }
  .x-header .x-header-left a,.x-header .x-header-left button,.x-header .x-header-right a,.x-header .x-header-right button {
    color: #fff
  }
  .x-header .x-header-left .x-header-back:before {
    border-color: #fff;
  }
</style>
