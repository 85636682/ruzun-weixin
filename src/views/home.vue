<template lang="html">
    <div class="home_header">
      <div class="face">
        <div class="l">
        </div>
        <div class="c" @click="goTeam">
          <img v-if="sundry.team.logo" :src="sundry.team.logo" style="width:50px;height:50px;" />
          <img v-else src="../assets/home_header_team_logo.png" style="width: 50px;height: 50px;" />
          <div class="" v-if="isLogged && sundry.joined">
            {{sundry.team.name}}
          </div>
          <div v-else>创建/加入球队</div>
        </div>
        <div class="r">
          <img src="../assets/notification.png" style="width:30px;height:30px;" />
        </div>
      </div>
      <div class="tabbar">
        <div class="item" @click="teamMember">
          <i class="fa fa-user"></i>
          <div class="name">球员</div>
        </div>
        <div class="item" @click="board">
          <i class="fa fa-edit"></i>
          <div class="name">战术板</div>
        </div>
        <div class="item" @click="teamOutlay">
          <i class="fa fa-money"></i>
          <div class="name">队费</div>
        </div>
      </div>
    </div>
    <div class="home_main" v-if="isLogged">
      <div class="calendar">
        <div class="header">
          <div class="title">球队日程</div>
          <div class="count">0场待录入</div>
        </div>
        <div class="played" @click="goToPlayeds">
          <div class="home_team">
            <div class="logo">
              <img :src="sundry.played.home_team.logo" width="100" height="100" alt="" />
            </div>
            {{sundry.played.home_team.name}}
          </div>
          <div class="vs">
            <div class="">
              <img src="../assets/vs.png" width="60" height="60" alt="" />
            </div>
            <div class="">
              {{sundry.played.start_day}}
              {{sundry.played.start_time}}
            </div>
            <div class="">
              {{sundry.played.home_team_score}} : {{sundry.played.guest_team_score}}
            </div>
          </div>
          <div class="guest_team">
            <div class="logo">
              <img :src="sundry.played.guest_team.logo" width="100" height="100" alt="" />
            </div>
            {{sundry.played.guest_team.name}}
          </div>
        </div>
      </div>

      <div class="weui_cells weui_cells_access">
        <a class="weui_cell" @click="money" href="javascript:;">
          <div class="weui_cell_hd"><img src="../assets/money.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>入樽币</p>
          </div>
          <div class="weui_cell_ft"></div>
        </a>
        <a class="weui_cell" @click="bathhouse" href="javascript:;">
          <div class="weui_cell_hd"><img src="../assets/bathhouse.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
          <div class="weui_cell_bd weui_cell_primary">
            <p>更衣室</p>
          </div>
          <div class="weui_cell_ft"></div>
        </a>
      </div>
    </div>
    <div class="home_no_sign_in" v-else>
      <img src="../assets/no_sign_in.jpg" style="width:100px;" alt="" />
      <div style="margin-top:10px;">
        游客状态无法创建球队记录比赛
      </div>
      <div style="margin-bottom:10px;">
        快去注册登录享受更多精彩
      </div>
      <a v-link="{name: 'signin'}" class="button button-primary">登 录</a>
    </div>
    <Tabbar></Tabbar>
    <loading :show="this.isLogged && $loadingRouteData"></loading>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import Tabbar from '../components/Tabbar'
  import * as userService from '../services/userService'
  import { catchError } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        isLogged: state => state.users.isLogged,
        token: state => state.users.token,
        user: state => state.users.user
      },
      actions: {
        catchError
      }
    },
    data: function () {
      return {
        sundry: {
          team: {},
          played: {
            home_team: {},
            guest_team: {}
          }
        }
      }
    },
    route: {
      data (transition) {
        if (this.isLogged) {
          userService.getSundry(this.token)
          .then((responseJson) => {
            this.$set('sundry', responseJson.sundry)
            transition.next()
          })
          .catch((error) => {
            this.catchError(error)
          })
        }
      }
    },
    methods: {
      teamMember () {
        if (this.isLogged) {
          this.$route.router.go({ name: 'teamsusers', params: { tid: this.sundry.team.id } })
        } else {
          this.$route.router.go({ name: 'signin' })
        }
      },
      board () {
        window.alert('请期待！')
      },
      teamOutlay () {
        window.alert('请期待！')
      },
      money () {
        window.alert('请期待！')
      },
      bathhouse () {
        window.alert('请期待！')
      },
      goTeam () {
        if (this.isLogged) {
          if (this.sundry.joined) {
            this.$route.router.go({ name: 'team', params: { tid: this.sundry.team.id } })
          } else {
            this.$route.router.go({ name: 'teams' })
          }
        } else {
          this.$route.router.go({ name: 'signin' })
        }
      },
      goToPlayeds () {
        this.$route.router.go({ name: 'teamsplayeds', params: { tid: this.sundry.team.id } })
      }
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
