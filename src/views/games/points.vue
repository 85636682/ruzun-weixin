<template lang="html">
  <x-header>
    积分榜
  </x-header>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd">胜局积2分 | 败局积1分 | 弃权积0分</div>
    <div class="weui_panel_bd">
      <a v-for="game_team in game_teams" href="javascript:void(0);" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img class="weui_media_appmsg_thumb" :src="game_team.team.logo" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{game_team.team.name}}</h4>
          <p class="weui_media_desc">获得{{game_team.wins}}胜{{game_team.losses}}负的战绩，共计{{game_team.points}}积分,拥有净胜分：{{game_team.score_difference}}</p>
        </div>
      </a>
    </div>
  </div>
  <loading :show="$loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import * as gameService from '../../services/gameService'
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
        game_teams: []
      }
    },
    route: {
      data (transition) {
        gameService.getPoints(this.$route.params.gid)
        .then((responseJson) => {
          this.$set('game_teams', responseJson)
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
