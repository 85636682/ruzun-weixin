<template lang="html">
  <x-header>
    {{game.name}}
  </x-header>
  <div class="team_logo">
    <div class="logo">
      <img :src="game.logo" alt="" />
    </div>
  </div>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-at"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{game.name}}</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell weui_cells_access" v-link="{name: 'constitution', params: {gid: this.game.id}}">
      <div class="weui_cell_hd">
        <i class="fa fa-tag"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">查看章程</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell weui_cells_access" v-link="{name: 'playeds', params: {gid: this.game.id}}">
      <div class="weui_cell_hd">
        <i class="fa fa-tag"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">查看赛程</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell weui_cells_access" v-link="{name: 'points', params: {gid: this.game.id}}">
      <div class="weui_cell_hd">
        <i class="fa fa-tag"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">积分榜</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
  </div>
  <div class="weui_cells_title">得分排行：</div>
  <div class="weui_cells">
    <div class="weui_cell" v-for="(index, user) in game.the_top_ten_users">
      <div class="weui_cell_hd">
        <img :src="getOrderIcon(index)" style="width:20px;margin-right:5px;display:block">
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>{{user.user_name}}</p>
      </div>
      <div class="weui_cell_ft">总得分:{{user.pts_in_game}}</div>
    </div>
  </div>
  <div class="weui_cells_title">参赛队伍：</div>
  <div class="weui_cells">
    <div class="weui_cell" v-for="team in game.teams">
      <div class="weui_cell_hd">
        <img :src="team.logo" style="width:20px;margin-right:5px;display:block">
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>{{team.name}}</p>
      </div>
      <div class="weui_cell_ft">签位:{{team.lot}}</div>
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
      actions: {
        showToast
      }
    },
    data: function () {
      return {
        game: {
          teams: []
        }
      }
    },
    route: {
      data (transition) {
        gameService.getGame(this.$route.params.gid)
        .then((responseJson) => {
          this.$set('game', responseJson.game)
          transition.next()
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    methods: {
      getOrderIcon (index) {
        return index < 3 ? './static/images/o' + (index + 1) + '.png' : './static/images/after_o3.png'
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
