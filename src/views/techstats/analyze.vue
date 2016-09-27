<template lang="html">
  <x-header>
    数据分析
  </x-header>
  <loading :show="$loadingRouteData"></loading>
</template>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import Loading from 'vux/dist/components/loading'
  import { showToast } from '../../vuex/actions'

  export default {
    vuex: {
      actions: {
        showToast
      }
    },
    data () {
      return {
      }
    },
    route: {
      data (transition) {
        transition.next()
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