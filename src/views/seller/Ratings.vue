<template>
  <div class="sellerRatings">
    <div class="main">
      <div class="ratingsScoreWrapper">
        <div class="totalScore">
          <div class="totalScoreNum">{{$store.state.seller.score}}</div>
          <div class="totalScoreText">综合评分</div>
          <div class="totalScoreDesc">高于周边商家{{$store.state.seller.rankRate}}%</div>
        </div>
        <div class="serveScore">
          <div class="serveAttitude">
            <div class="serveAttitudeLeft">
              <div class="serveScoreItemText">服务态度</div>
              <div class="serveScoreItemData">
                <stars :stars="$store.state.seller.score" :strictSize="12" :noMargin="true"></stars>
              </div>
            </div>
            <div class="serveAttitudeRight">{{$store.state.seller.score}}</div>
          </div>
          <div class="foodScore">
            <div class="foodScoreleft">
              <div class="serveScoreItemText">商品评分</div>
              <div class="serveScoreItemData">
                <stars :stars="$store.state.seller.serviceScore" :strictSize="12" :noMargin="true"></stars>
              </div>
            </div>
            <div class="foodScoreRight">{{$store.state.seller.serviceScore}}</div>
          </div>
          <div class="postTime">
              <div class="serveScoreItemText">送达时间</div>
              <div class="serveScoreItemData">{{$store.state.seller.deliveryTime}}分钟</div>
            </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="ratingsMain">
        <div class="ratingTitle">
          <div class="ratingSelector">
            <div class="ratingAll" @click="setRatingsType(-1)" :class="calcCurrentType(-1)">
              <div class="ratingSelectText">全部</div>
              <div class="ratingSelectNumber">{{ratingAllNumber}}</div>
            </div>
            <div class="ratingGood" @click="setRatingsType(0)" :class="calcCurrentType(0)">
              <div class="ratingSelectText">满意</div>
              <div class="ratingSelectNumber">{{ratingGoodNumber}}</div>
            </div>
            <div class="ratingBad" @click="setRatingsType(1)" :class="calcCurrentType(1)">
              <div class="ratingSelectText">不满意</div>
              <div class="ratingSelectNumber">{{ratingBadNumber}}</div>
            </div>
          </div>
        </div>
        <div class="ratingHeader" @click="setRatingsType()">
          <div class="ratingButton" :class=" { activeStatus: ratingsType.showContent }">
            <div class="icon-check_circle"></div>
          </div>
          <div class="ratingButtonText">只看有内容的评价</div>
        </div>
        <div class="ratingContent">
          <ul>
            <li class="ratingItem" v-for="(item,index) in filterRatings" :key="index">
              <div class="ratingItemTop">
                <div class="ratingItemPerson">
                  <div class="ratingItemIcon" :style="{'background-image':'url('+item.avatar+')'}"></div>
                  <div class="ratingsPersonInfo">
                    <div class="ratingItemNumber">{{item.username}}</div>
                    <div class="ratingsItemStar">
                      <stars :stars="item.score" :strictSize="12" :noMargin="true"></stars>
                    </div>
                  </div>
                </div>
                <div class="ratingItemTime">{{getLocalTime(item.rateTime)}}</div>
              </div>
              <div class="ratingItemText">{{item.text}}</div>
              <div class="ratingItemMain">
                <div class="ratingItemButton">
                  <div :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></div>
                </div>
                <span class="ratingItemRecommend" v-for="(remomend,i) in item.recommend" :key="i">{{remomend}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '../common/Stars'
export default {
  name: 'SellerRatings',
  data () {
    return {
      ratings: [],
      ratingsType: {
        type: -1,
        showContent: false
      },
      filterRatings: []
    }
  },
  components: {
    Stars
  },
  mounted () {
    this.$http.get('/getRatings')
      .then(v => {
        this.ratings = v
        this.setRatingsType(-1)
      })
      .catch(e => console.log('获取店家评价信息异常：' + e))
  },
  computed: {
    getLocalTime () {
      return function (time) {
        return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      }
    },
    ratingAllNumber () {
      return typeof this.ratings === 'object' ? this.ratings.length : 0
    },
    ratingGoodNumber () {
      return this.computedRatingsNumber().goodNumber || 0
    },
    ratingBadNumber () {
      return this.computedRatingsNumber().badNumber || 0
    },
    calcCurrentType () {
      return function (index) {
        return this.ratingsType.type === index ? 'ratingCurrent' : ''
      }
    }
  },
  methods: {
    showFoodDetail () {
      this.showFlag = !this.showFlag
      // this.setRatingsType(-1)
    },
    setRatingsType (value) {
      if (typeof value === 'number') {
        this.ratingsType.type = value
      } else {
        this.ratingsType.showContent = !this.ratingsType.showContent
      }
      let ratingsFinally = []
      let nowRatings = []
      if (this.ratingsType.showContent) {
        nowRatings = this.ratings.filter(item => {
          return item.text
        })
      } else {
        nowRatings = this.ratings
      }
      console.log(nowRatings)
      if (!this.ratingsType.type) {
        nowRatings.forEach(item => {
          if (!item.rateType) {
            ratingsFinally.push(item)
          }
        })
      } else if (this.ratingsType.type === 1) {
        nowRatings.forEach(item => {
          if (item.rateType === 1) {
            ratingsFinally.push(item)
          }
        })
      } else {
        ratingsFinally = nowRatings
      }
      this.filterRatings = ratingsFinally
    },
    computedRatingsNumber () {
      if (Object.prototype.toString.call(this.ratings) === '[object Array]') {
        let goodRatingsNumber = 0
        let badRatingsNumber = 0
        this.ratings.forEach(item => {
          if (!item.rateType) {
            goodRatingsNumber = goodRatingsNumber + 1
          } else {
            badRatingsNumber = badRatingsNumber + 1
          }
        })
        return {
          goodNumber: goodRatingsNumber,
          badNumber: badRatingsNumber
        }
      }
      return {
        goodNumber: 0,
        badNumber: 0
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.sellerRatings
  background-color #fff
  font-size 12px
  color rgb(7,17,27)
  line-height 18px
  .main
    overflow scroll
    height calc(100vh - 190px)
    background-color #fff
    -webkit-overflow-scrolling: touch
    overflow: -moz-scrollbars-none
    overflow: -moz-scrollbars-none
    &::-webkit-scrollbar
      display: none
    .ratingsScoreWrapper
      display flex
      padding 18px 0
      .totalScore
        flex 3
        border-right 1px solid rgba(7,17,27,0.1)
        text-align center
        .totalScoreNum
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
        .totalScoreText
          padding 6px 0 8px 0
          font-size 12px
          line-height 18px
        .totalScoreDesc
          padding-bottom 6px
          font-size 10px
          line-height 10px
      .serveScore
        flex 5
        padding 0 24px
        text-align left
        .serveScoreItemText,.serveScoreItemData
          display inline-block
          padding-right 12px
        .serveAttitude,.foodScore
          display flex
          justify-content space-between
        .serveAttitude
          padding-bottom 8px
          // .serveAttitudeLeft
          //   .serveScoreItemText
          //   .serveScoreItemData
          .serveAttitudeRight
            margin-right 24px
            color rgb(255,153,0)
        .foodScore
          padding-bottom 8px
          // .foodScoreleft
          //   .serveScoreItemText
          //   .serveScoreItemData
          .foodScoreRight
            margin-right 24px
            color rgb(255,153,0)
        .postTime
          .serveScoreItemText,.serveScoreItemData
            display inline-block
          .serveScoreItemData
            color rgb(147,153,159)
    .divider
      height 18px
      background-color rgba(7,17,27,0.05)
    .ratingsMain
      .ratingTitle
        border-bottom 1px solid rgba(7,17,27,0.1)
        .ratingTitleText
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .ratingSelector
          display flex
          margin 18px 24px
          font-size 12px
          color rgb(77,85,93)
          line-height 16px
          .ratingAll,.ratingGood,.ratingBad
            margin-right 8px
            padding 8px 12px
            border-radius 12px
          .ratingSelectText,.ratingSelectNumber
            display inline-block
          .ratingSelectText
              margin-right 6px
          .ratingGood,.ratingAll
            background-color rgba(0,160,220,0.2)
          .ratingBad
            background-color rgba(77,85,93,0.2)
          .ratingCurrent
            color rgb(255,255,255)
            background-color rgb(0,160,220)
      .ratingHeader
        padding 12px 24px
        font-size 24px
        color rgb(147,153,159)
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,0.1)
        text-align: left
        .ratingButton
          display inline-block
          margin-right 4px
        .ratingButtonText
          display inline-block
          font-size 12px
          vertical-align: top
        .activeStatus
          .icon-check_circle
            color rgb(0,160,220)
      .ratingContent
        padding 0 18px
        ul
          .ratingItem
            padding 18px 0
            border-bottom 1px solid rgba(7,17,27,0.1)
            text-align left
            .ratingItemTop
              display flex
              justify-content space-between
              font-size 10px
              line-height 12px
              color rgb(147,153,159)
              // .ratingItemTime
              .ratingItemPerson
                display flex
                .ratingsPersonInfo
                  flex 1
                  margin-left 12px
                  .ratingsItemStar
                    padding-top 4px
                  .ratingItemNumber
                    display inline-block
                    margin-right 6px
                .ratingItemIcon
                  display inline-block
                  background-size 28px 28px
                  width 28px
                  height 28px
                  border-radius 28px
                  vertical-align middle
            .ratingItemText
              margin-left 40px
              margin-top 6px
              // vertical-align bottom
              font-size 12px
              color rgb(7,17,27)
              line-height 18px
            .ratingItemMain
              margin-left 40px
              margin-top 6px
              color rgb(7,17,27)
              line-height 16px
              .ratingItemButton,.icon-thumb_down,.icon-thumb_up,.ratingItemText
                display inline-block
                font-size 12px
                vertical-align: middle
              .ratingItemButton
                .icon-thumb_up
                  color rgb(0,160,220)
              .ratingItemRecommend
                margin-left 8px
                padding 1px 6px
                overflow hidden
                // white-space nowrap
                text-overflow ellipsis
                font-size 9px
                color rgb(147,153,159)
                line-height 16px
                border-radius 2px
                border 1px solid rgba(7,17,27,0.1)
                width 64px
</style>
