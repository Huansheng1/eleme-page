const path = require('path')
const webpack = require('webpack')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/eleme-page/' : '/', // 公共路径，生产环境时默认在资源地址前加上dist/
  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
    // 优化moment 去掉国际化内容，只保留中文
    config.plugin('context').use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
  // devServer: {
  //   // open: true,
  //   // host: '127.0.0.1', // 只能是localhost或者127.0.0.1这种Ip地址，没啥可改的
  //   // port: 7777, // 可修改端口号
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.apiopen.top', // 代理地址，这里设置的地址会代替axios中设置的baseURL
  //       changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
  //       // ws: true, // proxy websockets
  //       // pathRewrite方法重写url
  //       pathRewrite: {
  //         '^/api': '/'
  //         // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
  //         // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
  //       }
  //     }
  //   }
  // }
}
