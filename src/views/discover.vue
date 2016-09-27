<template lang="html">
  <x-header>
    发现
  </x-header>
  <Tabbar></Tabbar>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tabbar from '../components/Tabbar'
  import { showToast } from '../vuex/actions'

  export default {
    vuex: {
      actions: {
        showToast
      }
    },
    data: function () {
      return {
      }
    },
    computed: {},
    ready: function () {},
    attached: function () {},
    methods: {},
    components: {
      XHeader,
      Tabbar
    }
  }
</script>
