<template>
  <div class="postOrder">
    <cube-button @click="showBtn">Dialog - btn</cube-button>
  </div>
</template>

<script>
export default {
  name: 'PostOrder',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '内容'
    },
    confirmBtn: {
      type: Object,
      default () {
        return {
          title: '确定',
          txt: '确定成功',
          hanlderFunc: Function
        }
      }
    },
    cancelBtn: {
      type: Object,
      default () {
        return {
          title: '取消',
          txt: '取消成功'
        }
      }
    }
  },
  data () {
    return {
      score: []
    }
  },
  methods: {
    showBtn () {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: this.title,
        content: this.content,
        confirmBtn: {
          text: this.confirmBtn.title,
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: this.cancelBtn.title,
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: this.confirmBtn.txt
          }).show()
          console.log(this.confirmBtn.hanlderFunc)
          if (typeof this.confirmBtn.hanlderFunc === 'function' && this.confirmBtn.hanlderFunc) {
            this.confirmBtn.hanlderFunc()
          }
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: this.cancelBtn.txt
          }).show()
        }
      }).show()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
