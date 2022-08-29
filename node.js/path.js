// 引入
const path = require('path')
// console.log(path)

// 拼接地址
console.log(path.join('aa','bb','cc'))
// 拿到当前的绝对地址再拼接
console.log(path.resolve('aa','bb','cc'))
console.log(__dirname)