<template>
  <div class="foodDetail" v-show="showFlag" transition="move">
    <div class="content">
      <div class="header">
        <div class="pic" :style="foodDetailImge"></div>
        <div class="headerInfo">
          <h1 class="foodName">{{food.name}}</h1>
          <div class="foodHeaderCenter">
            <div class="foodCount">月售{{food.sellCount}}份</div>
            <div class="foodRatingNumber">好评率{{food.rating}}%</div>
          </div>
          <div class="foodHeaderBottom">
            <div class="foodPrice">
              <div class="foodNowPrice">￥{{food.price}}</div>
              <div class="foodOldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</div>
            </div>
            <div class="foodButton">
              <div class="foodCarEmpty" v-show="!showCarcontrol" @click="addCar()">加入购物车</div>
              <car-control :foodinfo="food" v-show="showCarcontrol" ref="addCarButton" id="addCarButton"></car-control>
            </div>
          </div>
        </div>
      </div>
      <div class="introduction" v-if="food.info">
        <h2 class="introductionTitle">商品介绍</h2>
        <div class="foodText">{{food.info}}</div>
      </div>
      <div class="foodRating">
        <div class="ratingTitle">
          <h2 class="ratingTitleText">商品评价</h2>
          <div class="ratingSelector">
            <div class="ratingAll" @click="setRatingsType(-1)" :class="calcCurrentType(-1)">
              <div class="ratingSelectText">全部</div>
              <div class="ratingSelectNumber">{{ratingAllNumber}}</div>
            </div>
            <div class="ratingGood" @click="setRatingsType(0)" :class="calcCurrentType(0)">
              <div class="ratingSelectText">推荐</div>
              <div class="ratingSelectNumber">{{ratingGoodNumber}}</div>
            </div>
            <div class="ratingBad" @click="setRatingsType(1)" :class="calcCurrentType(1)">
              <div class="ratingSelectText">吐槽</div>
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
                <div class="ratingItemTime">{{getLocalTime(item.rateTime)}}</div>
                <div class="ratingItemPerson">
                  <div class="ratingItemNumber">{{item.username}}</div>
                  <div class="ratingItemIcon" :style="{'background-image':'url('+item.avatar+')'}"></div>
                </div>
              </div>
              <div class="ratingItemMain">
                <div class="ratingItemButton">
                  <div :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></div>
                </div>
                <div class="ratingItemText">{{item.text}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="icon-arrow_lift" @click="showFoodDetail()"></div>
  </div>
</template>

<script>
import CarControl from './CarControl'
export default {
  name: 'FoodDetail',
  data () {
    return {
      showFlag: false,
      ratingsType: {
        type: -1,
        showContent: false
      },
      filterRatings: []
    }
  },
  watch: {
    // 数据传递经常出现延迟，监听数据发生变化自动赋值
    food () {
      this.filterRatings = this.food.ratings
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
        nowRatings = this.food.ratings.filter(item => {
          console.log('当前item：')
          console.log(item)
          return item.text
        })
      } else {
        nowRatings = this.food.ratings
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
    addCar () {
      this.$refs.addCarButton.addFood(this.food)
    },
    computedRatingsNumber () {
      if (Object.prototype.toString.call(this.food.ratings) === '[object Array]') {
        let goodRatingsNumber = 0
        let badRatingsNumber = 0
        this.food.ratings.forEach(item => {
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
  },
  props: {
    food: Object
  },
  computed: {
    getLocalTime () {
      return function (time) {
        return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      }
    },
    foodDetailImge () {
      return { 'background-image': 'url(' + this.food.image + ')' }
    },
    showCarcontrol () {
      return this.$store.getters.returnCount(this.food) > 0
    },
    ratingAllNumber () {
      return typeof this.food.ratings === 'object' ? this.food.ratings.length : 0
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
  components: {
    CarControl
  },
  // 判断浏览器是否支持popstate，如果支持则将默认返回事件设置为我们指定的不显示方法
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.showFoodDetail, false)
    }
  },
  // 页面销毁时，取消监听。避免监听保留到其他vue路由页面
  destroyed () {
    window.removeEventListener('popstate', this.showFoodDetail, false)
  }
}
</script>

<style scoped lang="stylus">
*
  box-sizing border-box
  text-align left
.foodDetail
  position fixed
  top 0
  left 0
  box-sizing border-box
  overflow scroll
  width 100%
  height calc(100% - 60px)
  background-color #fff
  -webkit-overflow-scrolling: touch
  overflow: -moz-scrollbars-none
  overflow: -moz-scrollbars-none
  &::-webkit-scrollbar
    display: none
  z-index 30
  &.move-transition
    // 动画基本设置，播放多少秒和什么类型，我们这里设置为线性动画
    transition all 0.2s linear
    // 通过该行代码启用浏览器的硬件加速功能，能让动画表现更加流畅
    transform translate3d(0,0,0)
  &.move-enter,&.move-leave
    transform translate3d(100%,0,0)
  .icon-arrow_lift
    position fixed
    top 14px
    left 14px
    color #fff
    font-size 25px
    z-index 31
  .content
    width: 100vw
    height calc(100% - 60px)
    .header
      border-bottom 1px solid rgba(7,17,27,0.1)
      .pic
        background-size 100vw 100vw
        width 100vw
        height 100vw
      .headerInfo
        padding 18px
        text-align left
        box-sizing border-box
        width 100vw
        .foodName
          padding 18px 0 8px 0
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
          line-height 14px
        .foodHeaderCenter
          padding-bottom 18px
          .foodRatingNumber,.foodCount
            display inline-block
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
          .foodCount
            padding 0 12px 0 0
          // .foodRatingNumber
        .foodHeaderBottom
          display flex
          justify-content space-between
          // margin-right 34px
          .foodPrice
            flex 1
            font-size 700
            line-height 24px
            .foodOldPrice,.foodNowPrice
              display inline-block
              text-align left
              font-weight 700
              line-height 24px
            .foodNowPrice
              margin-right 12px
              font-size 14px
              color rgb(240,20,20)
            .foodOldPrice
              font-size 10px
              color rgb(147,153,159)
          .foodButton
            .foodCarEmpty
              box-sizing border-box
              display inline-block
              padding 6px 12px
              border-radius 12px
              background-color rgb(0,160,220)
              height 24px
              width 88px
              font-size 10px
              color #ffffff
              line-height 12px
            #addCarButton
              right 0
              bottom 0
    .foodRating,.introduction,.foodRating
      box-sizing border-box
      padding 18px
    .introduction
      .introductionTitle
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .foodText
        margin 6px 8px 0 8px
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
        line-height 24px
    .foodRating
      .ratingTitle
        border-bottom 1px solid rgba(7,17,27,0.1)
        .ratingTitleText
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .ratingSelector
          display flex
          margin 18px 0
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
        padding 12px 0
        font-size 24px
        color rgb(147,153,159)
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,0.1)
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
        ul
          .ratingItem
            padding 16px 0
            border-bottom 1px solid rgba(7,17,27,0.1)
            .ratingItemTop
              display flex
              justify-content space-between
              font-size 10px
              line-height 12px
              color rgb(147,153,159)
              .ratingItemPerson
                .ratingItemNumber
                  display inline-block
                  margin-right 6px
                .ratingItemIcon
                  display inline-block
                  background-size 12px 12px
                  width 12px
                  height 12px
                  border-radius 12px
                  vertical-align middle
            .ratingItemMain
              margin-top 6px
              color rgb(7,17,27)
              line-height 16px
              .ratingItemButton,.icon-thumb_down,.icon-thumb_up,.ratingItemText
                display inline-block
              .ratingItemText
                margin-left 4px
                vertical-align bottom
                font-size 12px
                line-height 16px
              .ratingItemButton
                .icon-thumb_up
                  color rgb(0,160,220)
</style>
