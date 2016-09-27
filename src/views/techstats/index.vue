<template lang="html">
  <x-header>
    技术统计
    <a slot="right" v-link="{name: 'analyze', params: {pid: $route.params.pid}}">
      分析
    </a>
  </x-header>
  <div class="techstats">
    <table class="techstat_table">
      <thead>
        <tr>
          <th colspan="15">{{homeTeam.name}}</th>
        </tr>
        <tr>
          <th style="width:70px;">球员</th>
          <th>得分</th>
          <th>犯规</th>
          <th>失误</th>
          <th>助攻</th>
          <th>抢断</th>
          <th>盖帽</th>
          <th>篮板</th>
          <th>前场篮板</th>
          <th>三分球</th>
          <th>三分球(入)</th>
          <th>罚球</th>
          <th>罚球(入)</th>
          <th>投篮</th>
          <th>投篮(入)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="techstat in homeTeam.techstats">
          <td>{{ techstat.user.name }}</td>
          <td>{{ techstat.pts }}</td>
          <td>{{ techstat.fouls }}</td>
          <td>{{ techstat.to }}</td>
          <td>{{ techstat.ast }}</td>
          <td>{{ techstat.stl }}</td>
          <td>{{ techstat.blk }}</td>
          <td>{{ techstat.off }}</td>
          <td>{{ techstat.reb }}</td>
          <td>{{ techstat.pm3 }}</td>
          <td>{{ techstat.pm3_a }}</td>
          <td>{{ techstat.ftm }}</td>
          <td>{{ techstat.ftm_a }}</td>
          <td>{{ techstat.fgm }}</td>
          <td>{{ techstat.fgm_a }}</td>
        </tr>
      </tbody>
    </table>
    <table class="techstat_table">
      <thead>
        <tr>
          <th colspan="15">{{guestTeam.name}}</th>
        </tr>
        <tr>
          <th style="width:70px;">球员</th>
          <th>得分</th>
          <th>犯规</th>
          <th>失误</th>
          <th>助攻</th>
          <th>抢断</th>
          <th>盖帽</th>
          <th>篮板</th>
          <th>前场篮板</th>
          <th>三分球</th>
          <th>三分球(入)</th>
          <th>罚球</th>
          <th>罚球(入)</th>
          <th>投篮</th>
          <th>投篮(入)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="techstat in guestTeam.techstats">
          <td>{{ techstat.user.name }}</td>
          <td>{{ techstat.pts }}</td>
          <td>{{ techstat.fouls }}</td>
          <td>{{ techstat.to }}</td>
          <td>{{ techstat.ast }}</td>
          <td>{{ techstat.stl }}</td>
          <td>{{ techstat.blk }}</td>
          <td>{{ techstat.off }}</td>
          <td>{{ techstat.reb }}</td>
          <td>{{ techstat.pm3 }}</td>
          <td>{{ techstat.pm3_a }}</td>
          <td>{{ techstat.ftm }}</td>
          <td>{{ techstat.ftm_a }}</td>
          <td>{{ techstat.fgm }}</td>
          <td>{{ techstat.fgm_a }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <loading :show="$loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import { showToast } from '../../vuex/actions'
  import * as techStatService from '../../services/techStatService'

  export default {
    vuex: {
      actions: {
        showToast
      }
    },
    data () {
      return {
        homeTeam: {},
        guestTeam: {}
      }
    },
    route: {
      data (transition) {
        techStatService.getTechstats(this.$route.params.pid)
        .then((responseJson) => {
          this.$set('homeTeam', responseJson.home_team)
          this.$set('guestTeam', responseJson.guest_team)
          transition.next()
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    computed: {},
    methods: {},
    components: {
      XHeader,
      Loading
    }
  }
</script>

<style lang="scss">
</style>
