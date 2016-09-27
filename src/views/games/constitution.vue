<template lang="html">
  <x-header>
    比赛章程
  </x-header>
  <article class="weui_article">
    {{{game.constitution_html}}}
  </article>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import * as gameService from '../../services/gameService'

  export default {
    data: function () {
      return {
        game: {}
      }
    },
    route: {
      data (transition) {
        gameService.getGame(this.$route.params.gid)
        .then((responseJson) => {
          this.$set('game', responseJson.game)
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

<style lang="css">
</style>
