<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="brand">
          <span class="brand"></span>
          <span class="seller-name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="support-icon"></span>
          <span class="support-info">
          {{seller.supports[0].description}}
        </span>
        </div>
        <span class="number" v-if="seller.supports" @click="changedetail()">
          <span class="support-number">
          {{seller.supports.length}}个
          </span>
          <span class="support-pattern"></span>
        </span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="icon"></span>
      <span class="message">{{seller.bulletin}}</span>
      <div class="support-pattern" @click="changedetail()"></div>
    </div>
    <div class="background" v-if="seller.avatar" :style="changeBgc">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellerHeader',
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    },
    showdetail: Boolean
  },
  methods: {
    changedetail () {
      this.$emit('update:showdetail', true)
    }
  },
  computed: {
    changeBgc () {
      return this.seller.avatar ? { 'background-image': 'url(' + this.seller.avatar + ')' } : {}
    }
  }
}
</script>

<style scoped lang="stylus">
#header
  position relative
  overflow hidden
  width auto
  color rgb(255,255,255)
  text-align left
  .content-wrapper
    display flex
    position relative
    width auto
    padding 24px 12px 18px 24px
    background-color rgba(7,17,27,0.5)
    .avatar
      display inline-block
      img
        width 64px
        height 64px
        border-radius 2px
    .content
      display inline-block
      flex 1
      div.brand
        margin 2px 0 8px 16px
        span.brand
          display inline-block
          background-image url(./../../assets/img/brand@2x.png)
          background-size 30px 18px
          width 30px
          height 18px
          vertical-align top
        .seller-name
          display inline-block
          margin-left 6px
          font-size 16px
          font-weight bold
          line-height 18px
      .description
        margin 8px 0 10px 16px
        font-size 12px
        font-weight 200
        line-height 12px
      .support
        margin 10px 0 0 16px
        .support-icon
          display inline-block
          background-image url(./../../assets/img/decrease_1@2x.png)
          margin 0 4px 2px 0
          background-size 16px 16px
          vertical-align top
          width 16px
          height 16px
        .support-info
          font-size 10px
          font-weight 200
          line-height 12px
      .number
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        border-radius 14px
        background-color rgba(0,0,0,0.2)
        vertical-align middle
        .support-number
          display inline-block
          font-size 10px
          font-weight 200
          line-height 12px
        .support-pattern
          display inline-block
          transform rotate(45deg)
          margin-left 2px
          border-right 2px solid #fff
          border-top 2px solid #fff
          height 5px
          width 5px
  .bulletin-wrapper
    position relative
    padding 6px 14px 6px 12px
    background-color rgba(7,17,27,0.4)
    .icon
      display inline-block
      background-image url(./../../assets/img/bulletin@2x.png)
      background-repeat no-repeat
      margin 0 4px 0 0
      background-size 22px 12px
      width 22px
      height 12px
    .message
      display inline-block
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      width 86vw
      font-size 10px
      color #ffffff
      font-weight 200
      line-height: 11px
    .support-pattern
      position absolute
      transform rotate(45deg)
      bottom 12px
      right 12px
      border-right 2px solid #fff
      border-top 2px solid #fff
      height 3px
      width 3px
  .background
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    filter blur(10px)
    z-index -1
</style>
