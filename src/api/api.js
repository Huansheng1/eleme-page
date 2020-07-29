import http from './http'
// 封装常用的get/post方法
export default {
  get (url, params = {}, config = {}) {
    return http.get(url, {
      params,
      ...config
    })
  },
  post (url, data = {}, config = {}) {
    return http.post(url, data, config)
  }
}
