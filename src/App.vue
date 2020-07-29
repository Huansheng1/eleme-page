<template>
  <div id="app">
    <my-tab-bar></my-tab-bar>
    <keep-alive>
      <router-view id="app-router-view" append></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MyTabBar from '@/views/common/MyTabBar'
export default {
  name: 'App',
  components: {
    MyTabBar
  },
  methods: {
  }
}
</script>

<style>
  @import 'assets/css/reset.css';
</style>

<style lang="stylus">
@import './common/stylus/index.styl'
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
