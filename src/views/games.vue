<template lang="html">
  <x-header>
    比赛
  </x-header>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd">参赛{{games.length}}场</div>
    <div class="weui_panel_bd">
      <a v-for="game in games" v-link="{name: 'game', params: {gid: game.id}}" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd">
          <img :src="game.logo" class="weui_media_appmsg_thumb" /></div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{game.name}}</h4>
          <p class="weui_media_desc"></p>
        </div>
      </a>
    </div>
  </div>
  <Tabbar></Tabbar>
  <loading :show="$loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import Tabbar from '../components/Tabbar'
  import * as gameService from '../services/gameService'
  import { showToast } from '../vuex/actions'

  export default {
    vuex: {
      actions: {
        showToast
      }
    },
    data: function () {
      return {
        games: []
      }
    },
    route: {
      data (transition) {
        gameService.getGames()
        .then((responseJson) => {
          this.$set('games', responseJson)
          transition.next()
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    methods: {},
    components: {
      XHeader,
      Loading,
      Tabbar
    }
  }
</script>

<style lang="scss">
</style>
