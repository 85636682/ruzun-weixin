<template lang="html">
  <x-header>
    注册
  </x-header>
  <div class="weui_cells weui_cells_form">
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:15%;">
        <label class="weui_label">
          <i class="fa fa-mobile"></i> 手机
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="手机号码" v-model="user.mobile" />
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:15%;">
        <label class="weui_label">
          <i class="fa fa-lock"></i> 密码
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="password" placeholder="密码" v-model="user.password" />
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:15%;">
        <label class="weui_label">
          <i class="fa fa-user"></i> 姓名
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="名字" v-model="user.name" />
      </div>
    </div>
  </div>
  <div class="button_sp_area" style="margin-top:30px;padding: 10px;">
    <a @click="signUp" href="javascript:;" class="weui_btn weui_btn_plain_primary">注 册</a>
  </div>
  <divider>已有账号?</divider>
  <div class="button_sp_area" style="margin-top:5px;padding: 10px;">
    <a v-link="{ name: 'signin' }" class="weui_btn weui_btn_plain_primary">登 录</a>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Divider from 'vux/dist/components/divider'
  import * as userService from '../services/userService'
  import { showToast } from '../vuex/actions'

  export default {
    vuex: {
      actions: {
        showToast
      }
    },
    data: function () {
      return {
        user: {
          mobile: '',
          password: '',
          name: ''
        }
      }
    },
    methods: {
      signUp () {
        if (this.user.mobile === '' && this.user.password === '' && this.user.name === '') {
          this.showToast('手机、名称不能为空！')
          return
        }
        if (this.user.password.length < 6 || this.user.password.length > 12) {
          this.showToast('密码长度为6-12位')
          return
        }
        userService.createUser({user: this.user})
        .then((responseJson) => {
          // 注册成功
          localStorage.setItem('ruzun_user_token', responseJson.user.token)
          localStorage.setItem('ruzun_user_id', responseJson.user.id)
          this.$route.router.go({name: 'home'})
        })
        .catch((error) => {
          // 登录失败
          console.log(error)
          this.showToast('注册失败！')
        })
      }
    },
    components: {
      XHeader,
      Divider
    }
  }
</script>
