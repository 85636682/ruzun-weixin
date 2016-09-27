<template lang="html">
  <x-header>
    {{currentTeam.name}}赛程
  </x-header>
  <div class="playeds">
    <div class="played" v-for="played in playeds" @click="goToTechstat(played)">
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
  import * as teamService from '../../services/teamService'

  export default {
    data: function () {
      return {
        currentTeam: {},
        playeds: []
      }
    },
    route: {
      data (transition) {
        teamService.getTeamPlayeds(this.$route.params.tid)
        .then((responseJson) => {
          this.$set('currentTeam', responseJson.team)
          this.$set('playeds', responseJson.playeds)
          transition.next()
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    methods: {
      goToTechstat (played) {
        this.$route.router.go({name: 'techstats', params: {pid: played.id}})
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
