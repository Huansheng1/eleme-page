<template>
  <div class="stars">
    <span v-for="(item,index) in scoreChange" :key="item + index" :class="item" :style="styleChange"></span>
  </div>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    stars: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 24
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    strictSize: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      score: []
    }
  },
  methods: {
    scoreComputed () {
      this.score = []
      const zeroStars = Math.trunc(this.stars)
      const hasRemainder = !!(this.stars % 1)
      for (let i = 0; i < zeroStars; i++) { this.score.push('score-on') }
      if (hasRemainder) this.score.push('score-half')
      while (this.score.length < 5) { this.score.push('score-off') }
    }
  },
  computed: {
    scoreChange () {
      this.scoreComputed()
      return this.score
    },
    sizeChange () {
      return this.size / 24 > 1.5 ? 48 : this.size / 24 === 1.5 ? 36 : 24
    },
    styleChange () {
      const size = this.strictSize ? this.strictSize : this.sizeChange
      if (this.noMargin) {
        return {
          'background-size': size + 'px' + ' ' + size + 'px',
          width: size + 'px',
          height: size + 'px'
        }
      }
      return {
        'background-size': size + 'px' + ' ' + size + 'px',
        width: size + 'px',
        height: size + 'px',
        margin: '16px' + ' ' + size / 2 + 'px' + ' 28px' + ' ' + size / 2 + 'px'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.stars
  span
    display inline-block
  .score-on
    background-image url(../../assets/img/star48_on@3x.png)
  .score-half
    background-image url(../../assets/img/star48_half@3x.png)
  .score-off
    background-image url(../../assets/img/star48_off@3x.png)

</style>
