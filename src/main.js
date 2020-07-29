/* eslint-disable no-unused-vars */
import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import api from './api/api'
// 导入路由实例
import router from './router'
// 导入仓库状态
import store from './store'
// 导入creatApi
import './register.js'
const mockFlag = true
if (mockFlag) {
  require('./mock/mock')
}
// 引入qs
// import qs from 'qs'
Vue.prototype.$http = api
Vue.config.productionTip = false

new Vue({
  store, // ES6语法：store:store的简写形式，在Vue里这个赋值代码在底层等于执行这句代码：Vue.prototype.$store = store
  router, // Vue实例对象挂载上router对象
  render: h => h(App)
}).$mount('#app')
