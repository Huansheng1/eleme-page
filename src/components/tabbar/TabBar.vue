<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  .tabbar{
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0 -0.266667vw 0.533333vw rgba(0,0,0,.1);
    /* height: 49px; */
  }
</style>
