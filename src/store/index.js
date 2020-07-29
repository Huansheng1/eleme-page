// 为什么需要Vuex？多组件共享状态（数据）时传递与修改是一个麻烦操作，通过Vuex我们可以方便快捷的管理公用状态（可简单看作全局变量）
import Vue from 'vue'
import Vuex from 'vuex'
// Vue实例安装Vuex
Vue.use(Vuex)
// 注意，我们需要的是Vuex里的Store仓库对象（存放我们需要的东西，很生动吧）
const store = new Vuex.Store({
  state: {
    // 购物车列表数据，整个网站都需要它
    shoplist: [],
    seller: {},
    shopinfo: {
      totalPrice: 0,
      totalNumber: 0
    }
  },
  // 对state状态进行简单操作/同步操作使用mutations里定义的方法
  mutations: {
    sellerSet (state, payload) {
      state.seller = payload
    },
    addFood (state, payload) {
      // foodinfo格式
      // payload:{
      //   name:商品名称,
      //   image:商品大图链接,
      //   price:商品价格,
      //   count:商品数量
      //   // ...等food数据
      // }
      if (!payload.name) { return false }
      if (!payload.count) {
        payload.count = 1
        state.shoplist.push(payload)
      } else {
        state.shoplist.forEach((item, index) => {
          if (item.name === payload.name) {
            // 这里有坑，使用索引直接设置一个项时，Vue是不能检测到的，BUG找了挺久。。
            const newValue = state.shoplist[index]
            newValue.count++
            Vue.set(state.shoplist, index, newValue)
            // ++state.shoplist[index].count
          }
        })
      }
    },
    reduceFood (state, payload) {
      state.shoplist = state.shoplist.filter((item, index) => {
        if (item.name === payload.name) {
          return --state.shoplist[index].count > 0
        }
        return true
      })
    },
    clearcar (state) {
      state.shoplist = []
      state.shopinfo = {
        totalPrice: 0,
        totalNumber: 0
      }
    }
  },
  // 复杂操作/异步操作我们就需要定义在actions里
  actions: {},
  // 类似vue实例的计算属性compute
  getters: {
    caclTotal (state) {
      let allPrice = 0
      let allNumber = 0
      state.shoplist.forEach(item => {
        allPrice += item.price * item.count
        allNumber += item.count
      })
      state.shopinfo = {
        totalPrice: allPrice,
        totalNumber: allNumber
      }
      return state.shopinfo
    },
    returnCount (state) {
      return (payload) => {
        let count = 0
        state.shoplist.forEach((item) => {
          if (item.name === payload.name) {
            count = item.count
          }
        })
        return count
      }
    }
  },
  // 如果方法数据太多，我们就需要抽离出多个模块（单独创建js再导入），通过这里可以导入抽离出去的模块js文件
  modules: {}
})
export default store
