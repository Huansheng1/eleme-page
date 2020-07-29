<template>
<div>
<div class="Goods">
    <div class="GoodsSide" ref="GoodsMenu">
      <ul class="GoodsSideList hide-scroll">
        <li class="GoodsItem" v-for="(item,index) in goods" :key="index" :style="currentStyle(index)" @click="selectMenu(index)">
          <div class="GoodsType">
            <span v-if='item.type>-1' class="icon" :class="'iconType' + item.type"></span>
          {{item.name}}</div>
        </li>
      </ul>
    </div>
    <div class="GoodsWraper hide-scroll" ref="FoodsMenu">
      <ul>
        <li class="GoodsContent" v-for="item in goods" :key="item.name">
          <div class="GoodsContentType">{{item.name}}</div>
          <ul>
            <li v-for="(food,selectIndex) in item.foods" :key="JSON.stringify(food)" class="GoodsContentMain">
              <div class="icon" @click="changeFoodDetail(food,selectIndex)">
              <img :src="food.icon" alt="" class="food-icon">
            </div>
            <div class="food-info">
              <div class="name">{{food.name}}</div>
              <div class="description" v-if="food.description">{{food.description}}</div>
            <div class="food-info-count">
              <span class="sellCount">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="food-info-price">
              <span class="price">￥{{food.price}}</span>
              <span class="oldPrice" v-if="food.oldPrice">{{food.oldPrice}}</span>
            </div>
            <car-control :foodinfo="food"></car-control>
            </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <food-detail :food="selectFood" ref="foodDetail"></food-detail>
  <shop-car></shop-car>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import CarControl from './CarControl'
import ShopCar from './ShopCar'
import FoodDetail from './FoodDetail'

export default {
  name: 'SellerGoods',
  data () {
    return {
      goods: {},
      scrollY: 0,
      foodsHeightList: [],
      selectFood: {}
    }
  },
  components: {
    CarControl,
    ShopCar,
    FoodDetail
  },
  methods: {
    __initScroll () {
      this.menuScroll = new BScroll(this.$refs.GoodsMenu, {
        click: true,
        bounce: {
          top: false,
          bottom: true,
          left: false,
          right: false
        }
      })
      this.foodsScroll = new BScroll(this.$refs.FoodsMenu, {
        click: true,
        probeType: 3,
        bounce: {
          top: false,
          bottom: true,
          left: false,
          right: false
        }
      })
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = -pos.y
      })
    },
    __calcHeight () {
      const eleChildren = this.$refs.FoodsMenu.getElementsByClassName('GoodsContent')
      let height = 0
      this.foodsHeightList.push(height)
      for (const item of eleChildren) {
        height += item.clientHeight
        // console.log(item.offsetHeight)
        this.foodsHeightList.push(height)
      }
    },
    selectMenu (index) {
      this.foodsScroll.scrollToElement(this.$refs.FoodsMenu.getElementsByClassName('GoodsContent')[index], 200)
    },
    changeFoodDetail (food, selectIndex) {
      this.selectFood = food
      this.$refs.foodDetail.showFoodDetail()
    }
  },
  mounted () {
    this.$http.get('/getGoods')
      .then(v => {
        this.goods = v
        this.$nextTick(() => {
          this.__initScroll()
          this.__calcHeight()
        })
      })
      .catch(e => console.log('获取商品信息异常：' + e))
  },
  computed: {
    currentIndex () {
      for (let i = 0, len = this.foodsHeightList.length - 1; i < len; i++) {
        if (this.scrollY >= this.foodsHeightList[i] && this.scrollY < this.foodsHeightList[i + 1]) { return i }
      }
      // this.scrollY
      return 0
    },
    currentStyle () {
      // 返回一个带参数的函数即可给computed传参
      return function (index) {
        return index === this.currentIndex ? { 'background-color': 'rgb(255, 255, 255)', 'font-weight': 400 } : {}
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.Goods
  display flex
  overflow hidden
  height calc(100vh - 228px)
  // .hide-scroll
  //   &::-webkit-scrollbar
  //     display:none
  .GoodsSide
    display flex
    flex-direction columns
    background-color #f3f5f7
    height calc(100vh - 228px)
    // overflow auto
    // -webkit-overflow-scrolling touch
    width 80px
    .GoodsSideList
      height calc(100vh - 228px)
      overflow hidden
      // -webkit-overflow-scrolling touch
      .GoodsItem
        display flex
        align-items center
        border-bottom 1px solid rgba(7,17,27,0.1)
        height 58px
        .GoodsType
          display inline-block
          margin 0 15px
          text-align left
          font-size 12px
          font-weight 200
          color #343232
          line-height 14px
          .icon
            background-size 12px 12px
            display inline-block
            vertical-align top
            height 12px
            width 12px
          .iconType-1
            // display none
          .iconType0
            background-image url(../../assets/img/decrease_4@3x.png)
          .iconType1
            background-image url(../../assets/img/discount_4@3x.png)
          .iconType2
            background-image url(../../assets/img/special_4@3x.png)
          .iconType3
            background-image url(../../assets/img/invoice_4@3x.png)
          .iconType4
            background-image url(../../assets/img/guarantee_4@3x.png)
  .GoodsWraper
    flex 1
    height calc(100vh - 228px)
    overflow hidden
    // -webkit-overflow-scrolling touch
    .GoodsContent
      width auto
      white-space nowrap
      .GoodsContentType
        border-left 2px solid #d9dde1
        background-color #f3f5f7
        font-size 12px
        line-height 26px
        color rgb(147,153,159)
        height 28px
      .GoodsContentMain
        display block
        padding 18px
        text-align left
        border-bottom 1px solid rgba(7,17,27,0.1)
        max-height 80px
        &:last-child
          border-bottom none
        .icon
          display inline-block
          vertical-align middle
          width 60px
          height 60px
          .food-icon
            width 60px
            height 60px
            // vertical-align middle
        .food-info
          display inline-block
          vertical-align top
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          .name
            padding 2px 0 8px 10px
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
          .description, .food-info-count
            padding 0 0 8px 10px
          .food-info-count
            display inline-block
          .description
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            width calc(78vw - 90px)
            line-height 12px
          .food-info-count>.sellCount
            margin-right 12px
          .food-info-price
            padding-left 10px
          .food-info-price>.price
            margin-right 8px
            font-size 14px
            color #ee0a0a
            font-weight 700
            line-height 24px
          .food-info-price>.oldPrice
            vertical-align bottom
            text-decoration line-through
            font-size 10px
            color rgb(147,153,159)
            font-weight 700
            line-height 24px
</style>
