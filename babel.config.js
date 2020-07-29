// // 所有生产环境
// const prodPlugin = []

// if (process.env.NODE_ENV === 'production') {
//   // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
//   prodPlugin.push([
//     'babel-plugin-transform-remove-console',
//     {
//       // 保留 console.error 与 console.warn
//       exclude: ['error', 'warn']
//     }
//   ])
// }
module.exports = {
  presets: [
    {
      plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]]
    },
    '@vue/cli-plugin-babel/preset'
  ]
}
