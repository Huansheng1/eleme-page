import axios from 'axios'
import env from './env'
import qs from 'qs'
// import store from '../store/index';
// import router from '../router'
// 根据不同的状态码，生成不同的提示信息
const showStatus = (err) => {
  console.log('showStatus接收到的错误：')
  console.log(err)
  const status = Object.prototype.hasOwnProperty.call(err, 'response') ? err.message : err.response.status
  let message = ''
  // 这一坨代码可以使用策略模式进行优化
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      // toLogin() // 401: 未登录状态，跳转登录页
      break
    case 403:
      message = '拒绝访问(403)'
      localStorage.removeItem('token')// 登录过期，请重新登录
      config.headers.Authorization = ''
      // store.commit('loginSuccess', null)
      // setTimeout(() => {
      //   toLogin()
      // }, 1000)
      break
    case 404:
      message = '请求出错(404)'
      break
    case 405:
      message = '跨域请求被禁止(405)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = status > 200 && status < 300 ? `服务器接受请求成功，由于部分原因未能正确给出结果：(${status})!` : `接口请求出错：(${status})`
  }
  // alert(`${message}，请求出错！`)// 也可使用ui组件的弹窗或者toast提示等，alert会阻塞代码不推荐
  return `${message}，请检查网络或联系网络管理员！`
}
// 错误处理
const errHandle = (error) => {
  const err = {
    msg: showStatus(error),
    online: window.navigator.online, // 判断是否有网
    errormessage: error // 原始错误代码保存一份方便调试
  }
  // if (!err.online) store.commit('goodNetwork', false)// 断网时向store设置网络状态变量为假
  // 错误抛到业务代码
  return Promise.reject(new Error(err.msg))
}
// 待请求任务队列对象
// const pending = {}
// 取消请求令牌
// const CancelToken = axios.CancelToken
// const removePending = (key) => {
//   if (pending[key]) {
//     console.log('重复api：' + key + '请求被取消！')
//     pending[key]('取消重复请求')// 如果不为假则说明之前添加过方法，调用取消方法将队列里请求取消
//   }
//   delete pending[key]// 删除队列里的元素
// }
// // 请求标识生成
// const getHttpIdentify = (config, isReuest = false) => {
//   let url = config.url
//   if (isReuest) {
//     url = config.baseURL + config.url// .substring(1, config.url.length)
//   }
//   return config.method === 'get' ? encodeURIComponent(url + config.params) : encodeURIComponent(config.url + config.data)
// }
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   })
// }
// config默认配置
const config = {
  baseURL: env.baseURL,
  timeout: 6000,
  headers: {
    // 'x-requested-with': 'XMLHttpRequest', // xhr标识
    // 'Content-Type': 'multipart/form-data'
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 配置此参数为真表示跨域请求带上cookie凭证，MDN上写默认为false，但是实际上似乎默认为true（当该行不写时可测试）
    withCredentials: true // [跨域资源共享 CORS 详解 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/04/cors.html)
    // 'Accept-Language': 'zh-cn,zh;q=0.5' // 浏览器支持的语言分别是简体中文和中文，优先支持简体中文。
    // get: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   // 单点登录或者其他功能的通用请求头，可一并配置
    // }
  },
  validateStatus: function (status) {
    // 当返回状态码为200才判断为真
    return status === 200
  }
}
// 创建axios实例
const http = axios.create(config)
// 请求拦截器
http.interceptors.request.use((config) => {
  const qsMethods = ['post', 'put', 'patch']
  // 如果是提交数据的method则将data序列化
  if (qsMethods.indexOf && typeof (qsMethods.indexOf) === 'function' && (qsMethods.indexOf(config.method) > -1)) {
    config.data = qs.stringify(config.data)
  }
  // 拦截重复请求(即当前正在进行的相同请求)
  // const requestData = getHttpIdentify(config, true) // 生产标识请求
  // removePending(requestData, true)// 取消重复请求
  // config.cancelToken = new CancelToken(cancel => { // 创建当前请求的取消方法
  //   pending[requestData] = cancel// 将该请求的取消方法加入队列对象作为标识字段的值
  // })
  // 如果不是登录页面，给headers添加一个token令牌标识身份
  if (config.url.toLowerCase().indexOf('login') > -1 && config.headers.Authorization) {
    config.headers.Authorization = localStorage.getItem('token') || ''
  }
  return config
}, (error) => {
  console.log('请求前出现错误：' + error)
  return errHandle(error)
})
// 响应拦截器
http.interceptors.response.use((response) => {
  // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
  const data = response.data ? response.data : response.request.responseText || {}
  return data
}, (error) => {
  console.log('响应出现错误：' + error)
  return errHandle(error)
})
export default http
