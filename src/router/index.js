// index.js：配置路由列表，导入router目录时自动导入该文件
// 导入Vue组件与Router组件，最后导入路由列表需要使用到的页面组件
import Vue from 'vue'
import Router from 'vue-router'
// 给Vue安装router组件
Vue.use(Router)
// 路由列表
const routes = [
  {
    path: '', // 匹配主域名自动跳转index路径
    redirect: '/index'// 重定向不能是'/'，不然会无限循环在同一个地址跳转导致控制台报错！
  },
  {
    path: '/index',
    name: 'Index', // 路由名字（具名路由）
    component: () => import('@/views/index/Index')
  },
  {
    path: '/home', // Home地址
    name: 'Home', // 路由名字（具名路由）
    component: () => import('@/views/home/Home') // 对页面组件进行懒加载处理
  },
  {
    path: '/about', // 路由地址
    name: 'About', // 路由名字（具名路由）
    component: () => import('@/views/about/About') // 对页面组件进行懒加载处理
  },
  {
    path: '/seller', // 路由地址
    name: 'Seller', // 路由名字（具名路由）
    component: () => import('@/views/seller/Seller'), // 对页面组件进行懒加载处理
    redirect: '/seller/goods',
    children: [
      {
        path: 'goods',
        name: 'SellerGoods', // 路由名字（具名路由）
        component: () => import('@/views/seller/Goods') // 对页面组件进行懒加载处理
      },
      {
        path: 'ratings',
        name: 'SellerRatings',
        component: () => import('@/views/seller/Ratings')
      },
      {
        path: 'shop',
        name: 'SellerShop',
        component: () => import('@/views/seller/SellerShop')
      }
    ]
  }
]
// 创建router实例
const router = new Router({
  routes,
  linkActiveClass: 'active',
  mode: 'history' // 修改router模式为history而不是默认的hash
})
// 导出router路由实例
export default router
