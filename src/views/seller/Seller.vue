<template>
    <div class='seller'>
    <seller-header :seller="seller" :showdetail.sync="showdetail"></seller-header>
    <seller-tab-bar></seller-tab-bar>
    <router-view></router-view>
    <seller-detail :seller="seller" :showdetail.sync="showdetail"></seller-detail>
    </div>
</template>

<script>
import SellerTabBar from './SellerTabBar'
import SellerHeader from './SellerHeader'
import SellerDetail from './SellerDetail'
export default {
  components: {
    SellerTabBar,
    SellerHeader,
    SellerDetail
  },
  computed: {

  },
  data () {
    return {
      seller: {},
      showdetail: false
    }
  },
  methods: {
  },
  created () {
    this.$http.get('/getSeller')
      .then(v => {
        this.seller = v
        this.$store.commit('sellerSet', v)
      })
      .catch(e => console.log('获取商家信息异常: ' + e))
  },
  props: {

  },
  destroyed () {

  }
}
</script>
<style scoped lang="stylus">

</style>
