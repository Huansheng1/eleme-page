import Mock from 'mockjs'
const data = require('./../../public/data.json')// 引入json本地数据
// console.log(typeof data)
// 注意不能直接用字符串拦截'/api/getSeller'，因为其代码实际会把相对路径当成完整的路径去和'http://localhost:8080/api/getSeller'比较，导致拦截不到
Mock.mock(/\/api\/getSeller/, () => {
  console.log('mock拦截了')
  return data.seller
})
Mock.mock(/\/api\/getGoods/, data.goods)
Mock.mock(/\/api\/getRatings/, data.ratings)
