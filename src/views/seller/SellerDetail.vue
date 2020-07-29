<template>
  <div class="detail" v-if="showdetail">
    <div class="detail-wrapper">
      <div class="detail-main">
        <div id="title">
          {{seller.name}}
        </div>
        <stars :stars="seller.score" :size="24"></stars>
        <div v-if="seller.supports" id="supports-title">
          <div class="line"></div>
          <div class="seller-announcement">优惠信息</div>
          <div class="line"></div>
        </div>
        <div v-if="seller.supports" class="active">
          <div class="supports" v-for="item in seller.supports" :key="item.description">
            <span class="icon" :class="'iconType' + item.type"></span>
            <span class="content">{{item.description}}</span>
          </div>
        </div>
        <div v-if="seller.bulletin" id="supports-title">
          <div class="line"></div>
          <div class="seller-announcement">商家公告</div>
          <div class="line"></div>
        </div>
        <div v-if="seller.bulletin" class="announcement">{{seller.bulletin}}</div>
      </div>
    </div>
    <div class="close" @click="closeDetail()">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script>
import Stars from '../common/Stars'
export default {
  name: 'SellerDetail',
  components: {
    Stars
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    },
    showdetail: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    closeDetail () {
      this.$emit('update:showdetail', false)
    }
  }
}
</script>

<style scoped lang="stylus">
.detail
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(7,17,27,0.8)
  color rgb(255,255,255)
  backdrop-filter blur(10px)
  z-index 101
  .detail-wrapper
    min-height 100%
    overflow auto
    .detail-main
      margin-top 64px
      padding-bottom 64px
      #title
        font-size 16px
        font-weight 700
        line-height 16px
      #supports-title
        display flex
        padding 0 36px 24px 36px
        .line
          display inline-block
          margin 0 12px
          content ''
          border-bottom 2px solid rgba(255,255,255,0.2)
          flex 1
          height 7px
        .seller-announcement
          display inline-block
          font-size 14px
          font-weight 700
          line-height 14px
          white-space nowrap
      .active
        padding 0 48px 28px 48px
        .supports
          margin-bottom 12px
          text-align left
          .icon
            background-size 16px 16px
            display inline-block
            vertical-align middle
            height 16px
            width 16px
          .content
            display inline-block
            margin-left 6px
            font-size 12px
            font-weight 200
            line-height 12px
          .iconType0
            background-image url(../../assets/img/decrease_2@3x.png)
          .iconType1
            background-image url(../../assets/img/discount_2@3x.png)
          .iconType2
            background-image url(../../assets/img/special_4@3x.png)
          .iconType3
            background-image url(../../assets/img/invoice_4@3x.png)
          .iconType4
            background-image url(../../assets/img/guarantee_4@3x.png)
      .announcement
        padding 0 48px
        font-size 12px
        text-align left
        font-weight 200
        line-height 24px
  .close
    display inline-block
    position relative
    margin 0 auto
    top -48px
    font-size 32px
    z-index 101
</style>
