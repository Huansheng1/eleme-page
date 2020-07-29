<template>
  <div class="seller-tabbar">
    <router-link to="/seller/goods" class="routerItem"><div>商品</div></router-link>
    <router-link to="/seller/ratings" class="routerItem"><div>评价</div></router-link>
    <router-link to="/seller/shop" class="routerItem"><div>商家</div></router-link>
  </div>
</template>

<script>
export default {
  name: 'SellerTabBar',
  props: {
    path: String
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
.seller-tabbar
  display flex
  width auto
  height 40px
  line-height 40px
  border-bottom 1px solid rgba(7,17,27,0.1)
  .routerItem
    flex 1
    font-size 14px
    text-align center
    color rgb(77,85,93)
  .active
    color rgb(240, 20, 20)
    border-bottom 2px solid deeppink
</style>
