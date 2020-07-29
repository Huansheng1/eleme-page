<template>
  <div class="tabbar-item" @click="routerLink()">
    <div class="icon" v-if="!isActive&&hasIcon">
      <slot name="slot-icon"></slot>
    </div>
    <div class="icon" v-if="isActive&&hasIcon">
      <slot name="slot-icon-active"></slot>
    </div>
    <div class="icon-text" :style="changeColor">
      <slot name="slot-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data () {
    return {
      active: false
    }
  },
  props: {
    textColor: {
      type: String,
      default: 'pink'
    },
    path: String,
    hasIcon: {
      type: String,
      default: 'false'
    }
  },
  computed: {
    isActive () {
      // 避免主页路径导致一直被匹配的情况
      return this.$route.path.indexOf(this.path) > -1 && this.path !== '' && this.path !== '/'
    },
    changeColor () {
      return this.isActive ? { color: this.textColor } : {}
    }
  },
  methods: {
    routerLink () {
      if (this.$route.path !== this.path) this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tabbar-item{
    flex:1;
    text-align: center;
    padding-bottom: 1vh;
    padding-top: 1vh;
    align-self: center;
  }
  .icon img{
    height: 5vw;
    width: 5vw;
    vertical-align: top;
  }
  .icon-text {
    margin: 1vw 0 1vw 0 ;
  }
</style>
