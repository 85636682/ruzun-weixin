<template lang="html">
    <x-header>
      编辑队伍
    </x-header>
    <div class="team_logo">
      <div class="logo">
        <img :src="team.logo" alt="" @click="chooseImage" />
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
      <a @click="update" href="javascript:;" class="weui_btn weui_btn_plain_primary">保 存</a>
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
        team: {}
      }
    },
    route: {
      data (transition) {
        teamService.getTeam(this.$route.params.tid)
        .then((responseJson) => {
          this.$set('team', responseJson.team)
        })
        .catch((error) => {
          this.showToast(error)
        })
      }
    },
    methods: {
      update () {
        if (this.name === '') {
          this.showToast('名称不能为空！')
          return
        }
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        teamService.updateTeam(this.team.id, {team: this.team}, this.token)
        .then((responseJson) => {
          this.$set('team', responseJson.team)
          self.showToast('更新成功！')
        })
        .catch((error) => {
          this.showToast(error)
        })
      },
      chooseImage () {
        if (!this.isLogged) {
          this.$route.router.go({name: 'signin'})
          return
        }
        var self = this
        window.wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // var localIds = res.localIds 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            // $("#faceImg").attr("src", downSrc) 显示图片到页面上
            let uploadSrc = res.localIds.toString()
            window.wx.uploadImage({ // 上传到微信服务器上
              localId: uploadSrc,
              success: function (res) {
                teamService.updateLogo(self.team.id, res.serverId, self.token)
                .then((responseJson) => {
                  self.$set('team.logo', responseJson.logo)
                  self.showToast('上传成功！')
                })
                .catch((error) => {
                  self.showToast(error)
                })
              },
              fail: function (res) {
                alert(JSON.stringify(res))
              }
            })
          }
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
