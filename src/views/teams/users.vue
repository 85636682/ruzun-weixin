<template lang="html">
  <x-header>
    {{team.name}}
  </x-header>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd">{{team.name}}的球员：</div>
    <div class="weui_panel_bd">
      <a v-for="user in team.users" href="javascript:void(0);" class="weui_media_box weui_media_appmsg">
        <img v-if="isOwner" @click="kickUser(user)" src="../../assets/kick.png" style="position: absolute;top:0px;right:0px;width:20px;" />
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" :src="user.avatar" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{user.name}}</h4>
          <p class="weui_media_desc">身高{{user.height}}CM、体重{{user.weight}}KG、擅长{{user.position}}</p>
        </div>
      </a>
    </div>
  </div>
  <loading :show="$loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import * as teamService from '../../services/teamService'
  import { showToast } from '../../vuex/actions'

  export default {
    vuex: {
      getters: {
        isLogged: state => state.users.isLogged,
        token: state => state.users.token,
        user: state => state.users.user
      },
      actions: {
        showToast
      }
    },
    data: function () {
      return {
        team: {
          users: []
        }
      }
    },
    route: {
      data (transition) {
        teamService.getTeam(this.$route.params.tid)
        .then((responseJson) => {
          this.$set('team', responseJson.team)
          transition.next()
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    components: {
      XHeader,
      Loading
    }
  }
</script>

<style lang="scss">
</style>
