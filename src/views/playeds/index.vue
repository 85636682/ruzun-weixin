<template lang="html">
  <x-header>
    比赛赛程
  </x-header>
  <div class="playeds">
    <div class="played" v-for="played in playeds">
      <div class="home_team">
        <div class="logo">
          <img :src="played.home_team.logo" width="100" height="100" alt="" />
        </div>
        {{played.home_team.name}}
      </div>
      <div class="vs">
        <div class="">
          <img src="../../assets/vs.png" width="60" height="60" alt="" />
        </div>
        <div class="">
          {{played.start_day}}
          {{played.start_time}}
        </div>
        <div class="">
          {{played.home_team_score}} : {{played.guest_team_score}}
        </div>
      </div>
      <div class="guest_team">
        <div class="logo">
          <img :src="played.guest_team.logo" width="100" height="100" alt="" />
        </div>
        {{played.guest_team.name}}
      </div>
    </div>
  </div>
  <loading :show="$loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import * as playedService from '../../services/playedService'

  export default {
    data: function () {
      return {
        playeds: []
      }
    },
    route: {
      data (transition) {
        playedService.getPlayeds(this.$route.params.gid)
        .then((responseJson) => {
          this.$set('playeds', responseJson)
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
      Loading
    }
  }
</script>

<style lang="scss">
</style>
