let baseURL

// 根据 process.env.NODE_ENV 区分状态，切换不同的 baseURL
switch (process.env.NODE_ENV) {
  // 注意，如果我们手动传 --mode 参数必须全称，默认的可用简写判断
  // 开发环境，也可简写为：dev
  case 'development':
    baseURL = 'http://localhost:8080/api'
    break
  case 'test':
    baseURL = 'http://test.xuexizuoye.com/api'
    break
  // 生产环境，也可简写为：prod
  case 'production':
    baseURL = '/api'
    break
  default :
    baseURL = 'http://localhost:8080/api'
    break
}
// 根据浏览器本地自动更换接口主域名
function autoChangeBaseURL () {
  const apiURL = localStorage.getItem('apiURL') // 获取浏览器本地存储localStorage中Key为apiURL那一项的值
  if (process.env.NODE_ENV === 'development' && apiURL) { // 判断当前的环境是否为开发环境，如果是，判断apiURL是否存在
    baseURL = apiURL // 将baseURL修改为开发人员在浏览器预设的接口主域名
  }
  return baseURL
}
autoChangeBaseURL()
export default {
  baseURL
}
