<template lang="html">
  <x-header>
    我的
    <a v-if="isLogged" slot="right" v-link="{name: 'usersedit', params: { uid: user.id }}">
      编辑
    </a>
  </x-header>
  <div class="personal_header">
    <img src="../assets/personal_bg.jpg" class="personal_bg" alt="" />
    <div class="avatar">
      <img v-if="user.avatar" :src="user.avatar" alt="" />
      <img v-else src="../assets/home_header_team_logo.png" />
    </div>
  </div>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-at"></i> 姓名
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{user.name}}</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-wordpress"></i> 体重
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{user.weight}} 公斤</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-h-square"></i> 身高
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{user.height}} cm</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-tag"></i> 位置
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{user.position}}</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
  </div>
  <div v-if="isLogged" class="button_sp_area" style="margin-top:20px;padding: 10px;">
    <a @click="logout" href="javascript:;" class="weui_btn weui_btn_warn">退出账号</a>
  </div>
  <div v-if="isLogged" class="button_sp_area" style="padding: 10px;">
    <a v-link="{name: 'teams'}" class="weui_btn weui_btn_plain_primary">加入球队</a>
  </div>
  <Tabbar></Tabbar>
  <loading :show="this.isLogged && $loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import Tabbar from '../components/Tabbar'
  import { showToast, signout } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        isLogged: state => state.users.isLogged,
        token: state => state.users.token,
        user: state => state.users.user
      },
      actions: {
        showToast,
        signout
      }
    },
    data () {
      return {
      }
    },
    route: {
      data (transition) {
        transition.next()
      }
    },
    methods: {
      logout () {
        this.signout()
        this.$route.router.go({name: 'signin'})
      }
    },
    computed: {
    },
    components: {
      XHeader,
      Loading,
      Tabbar
    }
  }
</script>

<style lang="scss">
</style>
