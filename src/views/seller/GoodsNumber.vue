<template>
  <div class="GoodsNumber">
    {{number}}
  </div>
</template>

<script>
export default {
  name: 'GoodsNumber',
  data () {
    return {
    }
  },
  methods: {
  },
  props: {
    number: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style scoped lang="stylus">
.GoodsNumber
  position absolute
  top 0
  right 0
  width 24px
  height 16px
  line-height 16px
  text-align center
  border-radius 16px
  font-size 9px
  font-weight 700
  color #ffffff
  background-color rgb(240,20,20)
  box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
  z-index 51
</style>
