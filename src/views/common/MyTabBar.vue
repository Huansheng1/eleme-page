<template>
  <tab-bar v-if="isShow">
    <tab-bar-item path="/index" text-color="#0089dc" has-icon="true">
      <img slot="slot-icon" src="./../../assets/img/category.svg" alt="">
      <img slot="slot-icon-active" src="./../../assets/img/category_active.svg" alt="">
      <div slot="slot-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/home" text-color="#0089dc">
      <img slot="slot-icon" src="./../../assets/img/home.svg" alt="">
      <img slot="slot-icon-active" src="./../../assets/img/home_active.svg" alt="">
      <div slot="slot-text">我的</div>
    </tab-bar-item>
    <tab-bar-item path="/seller" text-color="#0089dc">
      <img slot="slot-icon" src="./../../assets/img/profile.svg" alt="">
      <img slot="slot-icon-active" src="./../../assets/img/profile_active.svg" alt="">
      <div slot="slot-text">商家</div>
    </tab-bar-item>
    <tab-bar-item path="/about" text-color="#0089dc">
      <img slot="slot-icon" src="./../../assets/img/shopcart.svg" alt="">
      <img slot="slot-icon-active" src="./../../assets/img/shopcart_active.svg" alt="">
      <div slot="slot-text">关于</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar'
import TabBarItem from '@/components/tabbar/TabBarItem'
export default {
  name: 'MyTabBar',
  components: {
    TabBar,
    TabBarItem
  },
  computed: {
    isShow () {
      return this.$route.path.indexOf('seller') === -1
    }
  }
}
</script>

<style>

</style>
