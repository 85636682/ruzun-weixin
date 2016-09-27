<template lang="html">
    <x-header>
      参赛队伍
      <a v-if="isLogged" slot="right" v-link="{name: 'teamsnew'}">
        创建队伍
      </a>
    </x-header>
    <div class="weui_panel weui_panel_access">
      <div class="weui_panel_hd">参赛队伍一共{{teams.length}}队</div>
      <div class="weui_panel_bd">
        <a v-for="team in teams" v-link="{name: 'team', params: {tid: team.id}}" class="weui_media_box weui_media_appmsg">
          <div class="weui_media_hd">
            <img :src="team.logo" class="weui_media_appmsg_thumb" /></div>
          <div class="weui_media_bd">
            <h4 class="weui_media_title">{{team.name}}</h4>
            <p class="weui_media_desc">{{team.sign}}</p>
          </div>
        </a>
      </div>
    </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
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
        teams: []
      }
    },
    route: {
      data (transition) {
        teamService.getTeams()
        .then((responseJson) => {
          this.$set('teams', responseJson)
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    components: {
      XHeader
    }
  }
</script>

<style lang="scss">
</style>
