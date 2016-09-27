<template lang="html">
    <x-header>
      创建队伍
    </x-header>
    <div class="team_logo">
      <div class="logo">
        <img src="../../assets/team_default_logo.png" alt="" />
        <input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple />
      </div>
    </div>
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell">
        <div class="weui_cell_hd" style="width:5%;">
          <label class="weui_label">
            <i class="fa fa-at"></i>
          </label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" type="text" placeholder="队伍名称" v-model="team.name" />
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd" style="width:5%;">
          <label class="weui_label">
            <i class="fa fa-tag"></i>
          </label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" type="text" placeholder="队伍简介" v-model="team.sign" />
        </div>
      </div>
    </div>
    <div class="button_sp_area" style="margin-top:30px;padding: 10px;">
      <a @click="create" href="javascript:;" class="weui_btn weui_btn_plain_primary">创 建</a>
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
        team: {
          name: '',
          sign: ''
        }
      }
    },
    methods: {
      create () {
        if (this.name === '') {
          this.showToast('名称不能为空！')
          return
        }
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        teamService.createTeam({team: this.team}, this.token)
        .then((responseJson) => {
          this.$route.router.go({name: 'team', params: {tid: responseJson.team.id}})
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
