// 引入express
const express = require('express')
// 引入path
const path = require('path')
// 引入body 参数
const bodyParser = require('body-parser')

// 调用方法,生成实例
const app = express();
// 中间件匹配，从上往下请求，一旦匹配成功，立即停止
// 接口访问get请求
// let a = 0;
// app.get('/api_goods',(req,res,next) => {
//     a = 100;
//     // res.write('你好')
//     next();
    // res.send('我是goods数据')//相当于把write和end合二为一
// });
// app.get('/api_goods',(req,res)=>{
//     res.send('登陆成功'+a);
// })
// app.use方法默认匹配所有路径
// app.use((req,res,next)=>{
//     throw new Error('错误')
// })

// 设置静态,调用static方法，参数为路径文件夹（绝对路径）
// app.use(express.static('public'));
app.use('/lc',express.static(path.join(__dirname,'public')))

// 使用一下body,把前端post请求参数转化成一个叫body的对象，最后挂载到req对象上
app.use(bodyParser.urlencoded({extended:false}))

// app.get('/api_goods',(req,res)=>{
//     res.send('哈哈')
// })



// 监听
app.listen(3000,()=>{
    console.log('服务开启了')
})