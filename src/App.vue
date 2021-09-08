<template>
  <div id="app">
    <!-- 헤더 -->
    <div class="sp-header">
      <img class="logo" src="/image/logo.png" @click="$router.replace('ess')">
      <!-- 메뉴 -->
      <div class="sp-menu-group">
        <div v-for="menu in menus" :key="menu.link"
             @click="clickMenu(menu)"
             :class="{'sp-menu-selected': $route.path === '/' + menu.link }"
            class="sp-menu unselect">{{ menu.name }}</div>
      </div>
    </div>
    <router-view/>

    <!-- 팝업 -->
    <transition name="fade">
      <div class="popup-bg alert" v-if="vPopup" @click="clickOk">
        <div class="popup" @click.stop.prevent="">
          <div class="alert-box">
            <div class="alert-message">{{ message }}</div>
            <div class="flex" style="justify-content: space-between">
              <div class="btn-alert-dummy"></div>
            <div class="btn-alert-ok unselect" @click="clickOk">확인</div>
            <div class="btn-alert-exit unselect" @click="clickExit">상황종료</div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="alert-mini" v-if="vMini">
        <div class="alert-mini-message">{{ message }}</div>
        <div class="alert-mini-btn unselect" @click="clickExit">상황종료</div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
      name: 'App',
      data() {
          return {
              menus: [
                  {
                      link: 'ess',
                      name: 'Today'
                  },
                  {
                      link: 'detail',
                      name: 'Detail'
                  },
                  {
                      link: 'log',
                      name: 'Log'
                  }
              ],
              vPopup: false,
              message: '',
              vMini: false
          }
      },
      methods: {
          clickMenu(menu) {
              this.$router.push(menu.link);
          },
          clickOk() {
              this.vPopup = false;
              this.vMini = true;
          },
          clickExit() {
              this.axios.get(this.backendUrl + '/clear_event').then(res => {
                 if(res.status === 200) {
                     this.vPopup = false;
                     this.vMini = false;
                     this.message = '';
                     this.$store.commit('clearAlert');
                 }
              });
          }
      },
      created() {
          if(this.$route.path === '/') {
              this.$router.replace('ess');
          }
      },
      watch: {
          '$store.getters.alert'(n) {
              if(n) {
                  this.vPopup = true;
                  this.message = this.$store.getters.eventMessage;
              }
          }
      }
  }
</script>

<style lang="stylus">
html, body
  margin 0
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983

.unselect
  cursor pointer
  -ms-user-select none
  -moz-user-select -moz-none
  -khtml-user-select none
  -webkit-user-select none
  user-select none

.sp-content
  width 1280px
  margin 0 auto
  position relative

.sp-col-4
  width 33.3333%

.flex
  display flex
</style>

<style lang="stylus" scoped>
  .sp-header
    display flex
    justify-content space-between
    align-items center
    height 70px
    max-width 1280px
    margin 0 auto

  .logo
    height 34px


  .sp-menu-group
    display flex

  .sp-menu
    width 80px
    height 70px
    line-height 70px
    border-bottom 2px solid #ffffff
    color #7e7e7e
    font-weight 600
    cursor pointer

  .sp-menu:hover
    color #1555a7

  .sp-menu-selected
    color #1555a7
    border-bottom 2px solid #80e7fa

  .popup-bg
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    background-color rgba(0,0,0,0.6)
    z-index 10

  .popup
    position fixed
    left 50%
    top 50%
    transform translate(-50%,-50%)


  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .alert
    background-color rgba(255, 0, 0, 0.5)

  .alert-box
    box-shadow 2px 3px 6px #ff00003b
    background-color white
    border-radius 12px
    padding 40px
    width 480px

  .alert-message
    font-size 20px
    text-align left
    margin-bottom 40px
    white-space pre-wrap
    word-break break-all

  .btn-alert-ok
  .btn-alert-exit
  .btn-alert-dummy
    width 120px
    padding 8px 12px
    border-radius 4px
    color white

  .btn-alert-ok
    background-color #787878

  .btn-alert-exit
    background-color #fd4e4e

  .alert-mini
    position fixed
    z-index 10
    background-color white
    padding 20px
    width 360px
    top 40px
    left 60%
    box-shadow 2px 3px 6px #0000003b
    display flex

  .alert-mini-message
    font-size 15px
    padding-right 20px
    text-align left
    white-space pre-wrap
    word-break break-all
    flex 1

  .alert-mini-btn
    border-radius 4px
    background-color #fd4e4e
    color white
    font-size 14px
    height 32px
    line-height 32px
    padding 0 8px
</style>
