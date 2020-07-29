<template>
  <div class="sellerShop">
    <div class="content">
      <div class="shopHeader">
      <div class="shopHeaderTop" v-if="shopData.hasOwnProperty('score')">
        <div class="shopHeaderMain">
          <div class="shopHeaderTitle">{{shopData.name}}</div>
          <div class="shopHeaderTotal">
            <stars :stars="shopData.score" :strictSize="12" :noMargin="true" id="shopStar"></stars>
            <span class="ratingCount">（{{shopData.ratingCount}}）</span>
            <span class="saleCount">月售{{shopData.sellCount}}单</span>
          </div>
        </div>
        <div class="shopHeaderBtn" @click="collectionShop()">
          <div class="favorite">
            <div class="icon-favorite" :style="!isFavorite?{'color':'#ccc'}:{'color':'#f01414'}"></div>
          </div>
          <div class="favoriteText">{{favoriteText}}</div>
        </div>
      </div>
      <div class="shopHeaderContent">
        <div class="shopHeaderContentItem">
          <div class="shopHeaderContentItemTitle">起送价</div>
          <div class="shopHeaderContentItemNumber">{{shopData.minPrice}}</div>
        </div>
        <div class="shopHeaderContentItem">
          <div class="shopHeaderContentItemTitle">商家配送</div>
          <div class="shopHeaderContentItemNumber">{{shopData.deliveryPrice}}</div>
        </div>
        <div class="shopHeaderContentItem">
          <div class="shopHeaderContentItemTitle">平均配送时间</div>
          <div class="shopHeaderContentItemNumber">{{shopData.deliveryTime}}</div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="shopCenter">
      <div class="introduction" v-if="shopData.bulletin">
        <h2 class="introductionTitle">商品介绍</h2>
        <div class="foodText">{{shopData.bulletin}}</div>
        <div v-if="shopData.supports" class="active">
          <div class="supports" v-for="item in shopData.supports" :key="item.description">
            <span class="icon" :class="'iconType' + item.type"></span>
            <span class="content">{{item.description}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="shopImageWrapper" v-if="shopData.pics">
      <div class="shopImageTitle">商家实景</div>
      <div class="shopIamgeScroll">
        <ul>
          <li class="shopPicItem" v-for="(pic,picIndex) in shopData.pics" :key="picIndex">
            <img :src="pic" alt="" class="shopPicItemImg">
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
    <div class="shopBottom" v-if="shopData.infos">
      <div class="shopBottomTitle">商家信息</div>
      <div class="shopBottomContent">
        <div class="shopBottomContentText" v-for="(text,x) in shopData.infos" :key="x">{{text}}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Stars from '../common/Stars'
export default {
  name: 'SellerShop',
  components: {
    Stars
  },
  data () {
    return {
      shopData: {},
      isFavorite: false,
      favoriteText: '收藏'
    }
  },
  created () {
    if (!this.$store.state.seller.dep) {
      console.log('发送请求')
      this.$http.get('/getSeller')
        .then(v => {
          console.log(v)
          this.shopData = v
          this.$store.commit('sellerSet', v)
        })
        .catch(e => console.log('获取商家信息异常: ' + e))
    }
  },
  methods: {
    collectionShop () {
      this.isFavorite = !this.isFavorite
      this.favoriteText = this.isFavorite ? '已收藏' : '收藏'
    }
  }
}
</script>

<style scoped lang="stylus">
.sellerShop
  .content
    font-size 12px
    font-weight 200
    color rgb(7,17,27)
    line-height 32px
    background-color #fff
    overflow scroll
    max-height calc(100vh - 190px)
    background-color #fff
    -webkit-overflow-scrolling: touch
    overflow: -moz-scrollbars-none
    overflow: -moz-scrollbars-none
    &::-webkit-scrollbar
      display: none
    .divider
      height 18px
      background-color rgba(7,17,27,0.08)
    .shopHeader,.shopBottom,.shopImageWrapper,.shopCenter
      margin 18px
    .shopHeader
      .shopHeaderTop
        display flex
        justify-content space-between
        .shopHeaderMain
          .shopHeaderTitle
            padding-bottom 8px
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            text-align left
          .shopHeaderTotal
            text-align left
            #shopStar
              display inline-block
              margin-right 8px
            .ratingCount
              margin-right 12px
            .saleCount,.ratingCount
              font-size 10px
              color rgb(77,85,93)
              line-height 18px
        .shopHeaderBtn
          .favorite
            font-size 24px
            color rgb(240,20,20)
            line-height 24px
            // .icon-favorite
          .favoriteText
            padding-top 4px
            font-size 10px
            color rgb(77,85,93)
            line-height 10px
      .shopHeaderContent
        display flex
        justify-content space-around
        .shopHeaderContentItem
          flex 1
          margin-top 18px
          padding 0 12px
          border-right 1px solid #d9dde1
          &:last-child
            border-right none
          .shopHeaderContentItemTitle
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
          .shopHeaderContentItemNumber
            padding-top 4px
            font-size 20px
            font-weight 200
            color rgb(7,17,27)
            line-height 20px
    .shopCenter
      text-align left
      .introductionTitle
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .foodText
        margin 6px 8px 0 8px
        font-size 12px
        font-weight 400
        color #f01414
        line-height 24px
      .active
        padding-top 16px
        .supports
          // margin-bottom 12px
          text-align left
          .icon
            // padding-top 10px
            background-repeat: no-repeat
            background-size 16px 16px
            display inline-block
            height 16px
            width 16px
          .content
            display inline-block
            margin-left 6px
            font-size 12px
            font-weight 300
            line-height 16px
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
    .shopImageWrapper
      .shopImageTitle
        padding-bottom 12px
        font-size: 14px
        color: #07111b
        line-height: 14px
        border-bottom 1px solid rgba(7,17,27,0.1)
        text-align left
      .shopIamgeScroll
        ul
          display flex
          width: 100%
          max-height 90px
          overflow-x scroll
          overflow-y hidden
          position: relative
          -webkit-overflow-scrolling: touch
          overflow: -moz-scrollbars-none
          overflow: -moz-scrollbars-none
          &::-webkit-scrollbar
            display: none
          .shopPicItem
            display inline-block
            .shopPicItemImg
              width 120px
              height 90px
    .shopBottom
      .shopBottomTitle
        padding-bottom 12px
        font-size: 14px
        color: #07111b
        line-height: 14px
        border-bottom 1px solid rgba(7,17,27,0.1)
        text-align left
      .shopBottomContent
        .shopBottomContentText
          text-align left
          padding 16px 0 16px 12px
          font-size 12px
          font-weight 300
          line-height 16px
</style>
