<template>
  <div class="ShopCar">
    <div class="goodsListWrapper" v-show="showShopList">
      <div class="goodsListContent">
        <div class="header">
          <h3 class="headerText">购物车</h3>
          <span class="empty" @click="clearGoodsList()">清空</span>
        </div>
        <div class="goodsList">
          <ul>
            <li v-for="(item,index) in $store.state.shoplist" :key="index" class="goodsListSlector">
              <div class="goodsListItem">
                <div class="goodsListItemText">{{item.name}}</div>
                <div class="godsListItemRight">
                  <div class="goodsListItemPrice">￥{{item.price}}</div>
                <car-control :foodinfo="item" id='goodsListItemContrl'></car-control>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="goodsListBackground" @click="changeshowGoodsList()"></div>
    </div>
    <div class="content">
      <div class="left" @click="changeshowGoodsList()">
        <div class="icon" :class="isHighLight">
          <div class="icon-shopping_cart" :class="isHighLight"></div>
          <goods-number :number="totalNumber" v-show="$store.getters.caclTotal.totalNumber > 0"></goods-number>
        </div>
        <div class="totalPrice" :class="isHighLight">￥{{ $store.getters.caclTotal.totalPrice }}</div>
        <div class="deliveryPrice">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="right" :class="canOder" @click="postOrder()">{{ payDescription }}</div>
    </div>
  </div>
</template>

<script>
import GoodsNumber from './GoodsNumber'
import CarControl from './CarControl'
export default {
  name: 'ShopCar',
  props: {
  },
  data () {
    return {
      seller: {},
      deliveryPrice: 0,
      minPrice: 0,
      totalPrice: 0,
      totalNumber: 0,
      hasShopList: false,
      showShopList: false,
      ShopList: []
    }
  },
  watch: {
    // 通过监听计算属性来变相监听vuex数据是否发生变化
    listenshopinfo: function () {
      this.update()
    },
    listenshoplist: function () {
      this.changeShopList()
      this.update()
    },
    ShopList () {
      this.update()
    }
  },
  methods: {
    closeDetail () {
      this.$emit('update:showdetail', false)
    },
    changeShopList () {
      this.ShopList = this.$store.state.shoplist
      this.hasShopList = !!this.ShopList.length
      this.update()
    },
    update () {
      const shopinfo = this.$store.getters.caclTotal
      this.seller = this.$store.state.seller || 0
      this.deliveryPrice = this.seller.deliveryPrice || 0
      this.minPrice = this.seller.minPrice || 0
      this.totalPrice = shopinfo.totalPrice || 0
      this.totalNumber = shopinfo.totalNumber || 0
    },
    changeshowGoodsList () {
      this.changeShopList()
      // this.showShopList = !this.showShopList
      this.showShopList = this.showShopList ? false : this.hasShopList
    },
    clearGoodsList () {
      this.$store.commit('clearcar')
    },
    postOrder () {
      console.log('订单已提交')
      this.postOderComp = this.postOderComp || this.$createPostOrder({
        $props: {
          title: '订单支付',
          content: '当前订单总价：' + this.totalPrice + ' 元',
          confirmBtn: {
            title: '确认支付',
            txt: '支付成功',
            hanlderFunc: this.clearGoodsList
          },
          cancelBtn: {
            title: '取消支付',
            txt: '很遗憾，您取消了付款'
          }
        }
      })
      this.postOderComp.showBtn()
    }
  },
  components: {
    GoodsNumber,
    CarControl
  },
  computed: {
    isHighLight () {
      return { highLight: this.totalPrice > 0 }
    },
    canOder () {
      return this.totalPrice ? this.totalPrice >= this.minPrice ? 'canOder' : 'enoughOder' : ''
    },
    payDescription () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去下单'
      }
    },
    listenshopinfo () {
      console.log(this.$store.state.shopinfo)
      return this.$store.state.shopinfo
    },
    listenshoplist () {
      console.log('检测到了')
      return this.$store.state.shoplist
    }
  },
  mounted () {
    this.seller = this.$store.state.seller
    this.update()
  }
}
</script>

<style scoped lang="stylus">
.ShopCar
  position fixed
  left 0
  bottom 0
  box-sizing border-box
  width 100%
  margin-top 4px
  z-index 50
  .content
    position relative
    display flex
    background-color #141d27
    z-index 50
    .left
      display flex
      align-items center
      flex 1
      .icon
        position relative
        top -12px
        box-sizing border-box
        margin 0 18px
        padding 6px
        border-radius 50%
        width 56px
        height 56px
        background-color #141d27
        z-index 50
        &.highLight
          background rgb(0,160,220)
        .icon-shopping_cart
          background rgba(255,255,255,0.2) no-repeat center center
          background-size 24px 24px
          border-radius 50%
          color rgba(255,255,255,0.4)
          &::before
            width 44px
            height 44px
            font-size 24px
            line-height 44px
          &.highLight
            color #fff
      .totalPrice
        margin-right 12px
        font-size 16px
        color rgba(255,255,255,0.4)
        font-weight 700
        line-height 24px
        &.highLight
          color #fff
      .deliveryPrice
        margin-right 12px
        font-size 12px
        color rgba(255,255,255,0.4)
        font-weight 400
        line-height 24px
    .right
      box-sizing border-box
      padding 18px 8px
      width 120px
      font-size 16px
      color rgba(255,255,255,0.4)
      font-weight 700
      line-height 24px
      background-color rgba(255,255,255,0.2)
      white-space nowrap
      &.enoughOder
        background-color #2b333b
      &.canOder
        color #fff
        background-color #00b43c
  .goodsListWrapper
    padding-bottom 22px
    .goodsListContent
      position relative
      bottom: -20px
      padding-bottom 20px
      overflow hidden
      max-height 40vh
      background-color #f3f5f7
      z-index 49
      .header
        display flex
        align-items center
        justify-content space-between
        box-sizing border-box
        border 1px solid rgba(7,17,27,0.1)
        background-color #f3f5f7
        height 40px
        .headerText
          flex:1
          margin-left 18px
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
          line-height 40px
          text-align left
        .empty
          padding-right 18px
          font-size 12px
          font-weight 200
          color rgb(0,160,220)
          line-height 40px
      .goodsList
        overflow scroll
        height calc(100% - 74px)
        -webkit-overflow-scrolling: touch
        overflow: -moz-scrollbars-none
        overflow: -moz-scrollbars-none
        &::-webkit-scrollbar
          display: none
        ul
          .goodsListSlector
            .goodsListItem
              display flex
              justify-content space-between
              box-sizing border-box
              padding 12px 18px
              border 1px solid rgba(7,17,27,0.1)
              height 48px
              .goodsListItemText
                flex 1
                text-align left
                margin-bottom 3px
                font-size 14px
                color rgb(7,17,27)
                line-height 24px
              .godsListItemRight
                padding-right 66px
                .goodsListItemPrice
                  margin 0 12px 3px 0
                  font-size 14px
                  font-weight 700
                  color rgb(240,20,20)
                  line-height 24px
                  text-align right
                #goodsListItemContrl
                  top -32px
                  right -86px
    .goodsListBackground
      position fixed
      top 0
      left 0
      filter blur(5px)
      background-color rgba(7,17,28,0.6)
      width 100%
      height calc(100% - 50px)
      z-index 48
</style>
