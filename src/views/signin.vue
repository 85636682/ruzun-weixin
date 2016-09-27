<template lang="html">
  <x-header>
    登录
  </x-header>
  <div class="weui_cells weui_cells_form">
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:5%;">
        <label class="weui_label">
          <i class="fa fa-mobile"></i>
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="手机号码" v-model="mobile" />
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:5%;">
        <label class="weui_label">
          <i class="fa fa-lock"></i>
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="password" placeholder="密码" v-model="password" />
      </div>
    </div>
  </div>
  <div class="button_sp_area" style="margin-top:30px;padding: 10px;">
    <a @click="signIn" href="javascript:;" class="weui_btn weui_btn_plain_primary">登 录</a>
  </div>
  <divider>没账号?</divider>
  <div class="button_sp_area" style="margin-top:5px;padding: 10px;">
    <a v-link="{ name: 'signup' }" class="weui_btn weui_btn_plain_primary">注 册</a>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Divider from 'vux/dist/components/divider'
  import * as userService from '../services/userService'
  import { showToast, signin } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        isLogged: state => state.users.isLogged,
        token: state => state.users.token,
        user: state => state.users.user
      },
      actions: {
        showToast,
        signin
      }
    },
    data: function () {
      return {
        mobile: '',
        password: ''
      }
    },
    route: {
      data (transition) {
        if (this.isLogged) {
          this.$route.router.go({name: 'home'})
        }
      }
    },
    methods: {
      signIn () {
        if (this.mobile === '' && this.password === '') {
          this.showToast('手机和密码不能为空！')
          return
        }
        userService.signIn({mobile: this.mobile, password: this.password})
        .then((responseJson) => {
          // 登录成功
          this.signin(responseJson.user)
          this.$route.router.go({name: 'home'})
        })
        .catch((error) => {
          // 登录失败
          console.log(error)
          this.showToast('账号不存在或密码错误!')
        })
      }
    },
    components: {
      XHeader,
      Divider
    }
  }
</script>

<style lang="scss">
</style>
