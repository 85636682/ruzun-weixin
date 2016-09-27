<template lang="html">
  <footer>
    <div class="weui_tab">
      <div class="weui_tab_bd"></div>
      <div class="weui_tabbar">
        <a v-link="{ name: 'home', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/basketball.png" alt="">
          </div>
          <p class="weui_tabbar_label">入樽</p>
        </a>
        <a v-link="{ name: 'games', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/games.png" alt="">
          </div>
          <p class="weui_tabbar_label">比赛</p>
        </a>
        <a v-link="{ name: 'discover', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/discover.png" alt="">
          </div>
          <p class="weui_tabbar_label">发现</p>
        </a>
        <a v-link="{ name: 'personal', activeClass: 'weui_bar_item_on' }" class="weui_tabbar_item">
          <div class="weui_tabbar_icon">
            <img src="../assets/person.png" alt="">
          </div>
          <p class="weui_tabbar_label">我的</p>
        </a>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
  footer .weui_tab .weui_tabbar {
    position: fixed;
    z-index: 1030;
    bottom: 0;
    left: 0;
    background-color: #FFF;
  }
</style>
