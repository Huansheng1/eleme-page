<template>
  <div class="CarControl">
    <div class="reduce" @click="reduceFood()" :style="hiddenStyle">
      <div class="icon-remove_circle_outline"></div>
    </div>
    <div class="count" :style="hiddenStyle">{{foodPayload.count}}</div>
    <div class="add" @click="addFood()">
      <div class="icon-add_circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarControl',
  data () {
    return {
      // foodinfo格式
      // payload:{
      //   name:商品名称,
      //   image:商品大图链接,
      //   price:商品价格,
      //   count:商品数量
      //   // ...等food数据
      // }
      foodPayload: {
        count: 0
      }
    }
  },
  props: {
    foodinfo: {
      type: Object
    }
  },
  mounted () {
    this.__initShopCar()
  },
  methods: {
    addFood () {
      if (!this.foodPayload.name) { this.__initShopCar() }
      this.$store.commit('addFood', this.foodPayload)
      this.__initShopCar()
    },
    reduceFood () {
      this.$store.commit('reduceFood', this.foodPayload)
      this.__initShopCar()
    },
    // caclTotal () {
    //   return this.$store.getters.caclTotal
    // },
    __initShopCar () {
      // this.caclTotal()
      this.foodPayload = {
        ...this.foodinfo,
        count: this.$store.getters.returnCount(this.foodinfo)
      }
    }
  },
  computed: {
    hiddenStyle () {
      return this.foodPayload.count > 0 ? {} : { visibility: 'hidden' }
    },
    listenshoplist () {
      return this.$store.state.shoplist
    }
  },
  watch: {
    // 通过监听计算属性来变相监听vuex数据是否发生变化
    listenshoplist: function () {
      this.__initShopCar()
    }
  }
}
</script>

<style scoped lang="stylus">
.CarControl
  position relative
  right -120px
  bottom 32px
  display inline-block
  .reduce,.count,.add
    display inline-block
  .count
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147,153,159)
  .reduce,.add
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
</style>
