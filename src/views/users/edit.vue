<template lang="html">
  <x-header>
    首页
    <a slot="right" @click="update" href="javascript:;">
      保存
    </a>
  </x-header>
  <div class="team_logo">
    <div class="logo">
      <img :src="user.avatar" alt="" @click="chooseImage" />
    </div>
  </div>
  <div class="weui_cells weui_cells_form">
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:25%;">
        <label class="weui_label">
          真实姓名
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="名称" v-model="user.name"/>
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:25%;">
        <label class="weui_label">
          身高(CM)
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="身高" v-model="user.height"/>
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd" style="width:25%;">
        <label class="weui_label">
          体重(公斤)
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" type="text" placeholder="体重" v-model="user.weight"/>
      </div>
    </div>
    <div class="weui_cell weui_cell_select weui_select_after">
      <div class="weui_cell_hd" style="width:25%;">
        <label class="weui_label">
          擅长位置
        </label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <select class="weui_select" v-model="user.position">
          <option value="SG">得分后卫</option>
          <option value="PG">控球后卫</option>
          <option value="SF">小前锋</option>
          <option value="PF">大前锋</option>
          <option value="C">中锋</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import * as userService from '../../services/userService'
  import { showToast, setCurrentUser } from '../../vuex/actions'

  export default {
    vuex: {
      getters: {
        isLogged: state => state.users.isLogged,
        token: state => state.users.token
      },
      actions: {
        showToast,
        setCurrentUser
      }
    },
    data () {
      return {
        user: {}
      }
    },
    route: {
      data (transition) {
        if (this.isLogged) {
          userService.getUser(this.$route.params.uid)
          .then((responseJson) => {
            this.$set('user', responseJson.user)
          })
          .catch((error) => {
            this.showToast(error)
          })
        } else {
          this.$route.router.go({name: 'signin'})
        }
      }
    },
    methods: {
      update () {
        var formData = {
          user: {
            name: this.user.name,
            height: this.user.height,
            weight: this.user.weight,
            position: this.user.position
          }
        }
        userService.updateUser(this.user.id, formData, this.token)
        .then((responseJson) => {
          self.$set('user', responseJson.user)
          this.showToast('更新成功！')
        })
        .catch((error) => {
          console.log(error)
          this.showToast('更新失败！')
        })
      },
      chooseImage () {
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
                userService.updateAvatar(self.user.id, res.serverId, self.token)
                .then((responseJson) => {
                  self.$set('user', responseJson.user)
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
