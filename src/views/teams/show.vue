<template lang="html">
  <x-header>
    {{team.name}}
    <a v-if="isOwner" slot="right" v-link="{name: 'teamsedit'}">
      编辑
    </a>
  </x-header>
  <div class="team_logo">
    <div class="logo">
      <img :src="team.logo" alt="" />
    </div>
  </div>
  <div class="weui_cells">
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-at"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{team.name}}</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <i class="fa fa-tag"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">{{team.sign}}</p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
    <div class="weui_cell" v-link="{name: 'teamsplayeds'}">
      <div class="weui_cell_hd">
        <i class="fa fa-calendar"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p style="padding-left:10px;">
          {{ isLogged ? "查看本队赛程" : "查看该队赛程" }}
        </p>
      </div>
      <div class="weui_cell_ft"></div>
    </div>
  </div>
  <div v-if="team.users.length <= 14 && !isMember" class="button_sp_area" style="margin-top:20px;padding: 10px;">
    <a @click="joinTeam" href="javascript:;" class="weui_btn weui_btn_plain_primary">加入队伍</a>
  </div>
  <div v-if="isMember" class="button_sp_area" style="margin-top:20px;padding: 10px;">
    <a @click="quitTeam" href="javascript:;" class="weui_btn weui_btn_warn">退出队伍</a>
  </div>
  <!--
  <div v-if="isMember" class="button_sp_area" style="padding: 10px;">
    <a @click="clickNumberDialog" href="javascript:;" class="weui_btn weui_btn_plain_primary">
      {{ member.number === '' || member.number === null ? '输入球衣号码' : '球衣号码：' + member.number + '号' }}
    </a>
  </div>
  -->
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
  <div class="weui_dialog_confirm" v-if="showNumberInput">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">输入球衣号码(数字)</strong></div>
      <div class="weui_dialog_bd">
        <input type="number" v-model="memberNumber" pattern="[0-9]*" placeholder="请输入数字即可" />
      </div>
      <div class="weui_dialog_ft">
        <a @click="clickNumberDialog" href="javascript:;" class="weui_btn_dialog default">取消</a>
        <a @click="updateNumber" href="javascript:;" class="weui_btn_dialog primary">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import * as teamService from '../../services/teamService'
  import * as teamUserService from '../../services/teamUserService'
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
    data () {
      return {
        team: {
          users: [],
          owner: {}
        },
        isMember: false,
        member: {},
        showNumberInput: false,
        memberNumber: ''
      }
    },
    route: {
      data (transition) {
        teamService.getTeam(this.$route.params.tid)
        .then((responseJson) => {
          this.$set('team', responseJson.team)
          this.team.users.forEach((user) => {
            if (user.id === this.user.id) {
              this.$set('isMember', true)
              this.$set('member', user)
            }
          })
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    methods: {
      joinTeam () {
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        teamUserService.createTeamUser({team_id: this.$route.params.tid}, this.token)
        .then((responseJson) => {
          this.team.users.push(responseJson.user)
          this.showToast('加入成功！')
          this.$set('isMember', true)
        })
        .catch((error) => {
          console.log(error)
          this.showToast('加入失败！')
        })
      },
      quitTeam () {
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        teamUserService.deleteTeamUser({team_id: this.$route.params.tid}, this.token)
        .then((responseJson) => {
          this.team.users.$remove(responseJson.user)
          this.$set('isMember', false)
          this.showToast('退出成功！')
        })
        .catch((error) => {
          console.log(error)
          this.showToast('退出失败！')
        })
      },
      kickUser (user) {
        if (!this.isOwner) {
          this.showToast('你没有权限！')
          return
        }
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        teamUserService.kickUser({user_id: user.id, team_id: this.$route.params.tid}, this.token)
        .then((responseJson) => {
          this.team.users.$remove(user)
          this.showToast('踢出成功！')
        })
        .catch((error) => {
          console.log(error)
          this.showToast('踢出失败！')
        })
      },
      clickNumberDialog () {
        this.showNumberInput = !this.showNumberInput
        this.memberNumber = this.member.number
      },
      updateNumber () {
        if (!this.isMember) {
          this.showToast('你不是该队队员！')
          return
        }
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        teamUserService.updateMember({user_id: this.member.id, team_id: this.$route.params.tid, team_user: { number: this.memberNumber }}, this.token)
        .then((responseJson) => {
          this.$set('member', responseJson.user)
          this.showToast('更新成功！')
        })
        .catch((error) => {
          console.log(error)
          this.showToast('更新失败！')
        })
        this.clickNumberDialog()
      }
    },
    computed: {
      isOwner () {
        return this.team.owner.id === parseInt(this.user.id)
      }
    },
    components: {
      XHeader
    }
  }
</script>

<style lang="scss">
</style>
